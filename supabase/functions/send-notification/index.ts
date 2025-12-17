import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    // For email notifications, we would use a service like SendGrid, Resend, or Supabase's built-in email
    // For now, we'll just log it. In production, integrate with email service
    if (userPrefs?.email_notifications) {
      console.log(`Would send email to ${preferences.email}:`, {
        subject: notification.title,
        body: notification.body,
        url: notification.url,
      });
      
      // TODO: Integrate with email service (SendGrid, Resend, etc.)
      // Example with Resend:
      // await fetch('https://api.resend.com/emails', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${RESEND_API_KEY}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     from: 'notifications@investopatronus.com',
      //     to: preferences.email,
      //     subject: notification.title,
      //     html: `<p>${notification.body}</p><a href="${notification.url}">View</a>`,
      //   }),
      // });
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

