import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface NotificationRequest {
  userId: string;
  type: 'reply_to_discussion' | 'reaction_to_post' | 'reaction_to_reply' | 'new_follower' | 'mention';
  title: string;
  body: string;
  url?: string;
  data?: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const notification: NotificationRequest = await req.json();

    // Get user preferences
    const { data: preferences, error: prefError } = await supabase
      .from('profiles')
      .select('email, display_name')
      .eq('id', notification.userId)
      .single();

    if (prefError || !preferences) {
      throw new Error('User not found');
    }

    // Get user notification preferences from localStorage (stored in cookies/localStorage on client)
    // For now, we'll check if email notifications are enabled
    // In production, store preferences in database
    const { data: userPrefs } = await supabase
      .from('profiles')
      .select('email_notifications, push_notifications')
      .eq('id', notification.userId)
      .single();

    // Send email notification if enabled
    if (userPrefs?.email_notifications && preferences.email) {
      try {
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">${notification.title}</h2>
            <p style="color: #666; line-height: 1.6;">${notification.body}</p>
            ${notification.url ? `
              <div style="margin-top: 20px;">
                <a href="${notification.url}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
                  View Details
                </a>
              </div>
            ` : ''}
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              This is an automated notification from Investo Patronus.
            </p>
          </div>
        `;

        const emailResponse = await resend.emails.send({
          from: "Investo Patronus <info@investopatronus.com>",
          to: [preferences.email],
          subject: notification.title,
          html: emailHtml,
        });

        if (emailResponse.error) {
          console.error('Resend error:', emailResponse.error);
          // Don't throw - notification can still be stored in DB
        } else {
          console.log(`Email notification sent to ${preferences.email}:`, emailResponse);
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Don't throw - notification can still be stored in DB
      }
    }

    // Store notification in database for history
    const { error: dbError } = await supabase
      .from('notifications')
      .insert({
        user_id: notification.userId,
        type: notification.type,
        title: notification.title,
        body: notification.body,
        url: notification.url,
        data: notification.data || {},
        read: false,
      });

    if (dbError) {
      console.error('Error storing notification:', dbError);
      // Don't throw, notification can still be sent
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notification processed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error('Error sending notification:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

