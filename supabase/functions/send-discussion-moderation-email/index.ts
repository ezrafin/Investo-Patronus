import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface DiscussionModerationRequest {
  discussionId: string;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  category: string;
  tags?: string[];
  symbol?: string;
  assetType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication: require authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || '0.0.0.0';

    const { data: allowed } = await supabase.rpc('check_rate_limit', {
      p_ip_address: clientIp,
      p_action_type: 'moderation_email',
      p_max_attempts: 10,
      p_window_seconds: 3600,
    });

    if (allowed === false) {
      return new Response(
        JSON.stringify({ error: 'Too many requests' }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data: DiscussionModerationRequest = await req.json();

    // Validate required fields
    if (!data.discussionId || !data.title || !data.content || !data.authorName || !data.category) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const tagsText = data.tags && Array.isArray(data.tags) && data.tags.length > 0 
      ? data.tags.map(t => escapeHtml(String(t))).join(', ') 
      : 'None';
    
    const assetInfo = data.symbol && data.assetType
      ? `${escapeHtml(data.symbol)} (${escapeHtml(data.assetType)})`
      : 'None';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Discussion Pending Moderation
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Discussion ID:</strong> ${escapeHtml(data.discussionId)}</p>
          <p style="margin: 5px 0;"><strong>Author:</strong> ${escapeHtml(data.authorName)} (${escapeHtml(data.authorEmail)})</p>
          <p style="margin: 5px 0;"><strong>Category:</strong> ${escapeHtml(data.category)}</p>
          <p style="margin: 5px 0;"><strong>Tags:</strong> ${tagsText}</p>
          <p style="margin: 5px 0;"><strong>Asset:</strong> ${assetInfo}</p>
          <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 10px;">Title:</h3>
          <p style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; margin: 0;">
            ${escapeHtml(data.title)}
          </p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 10px;">Content:</h3>
          <div style="background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px; white-space: pre-wrap; max-height: 400px; overflow-y: auto;">
            ${escapeHtml(data.content)}
          </div>
        </div>

        <div style="margin: 30px 0; padding: 20px; background-color: #e7f3ff; border-radius: 5px; text-align: center;">
          <p style="margin: 0 0 15px 0; color: #333;">
            <strong>Please review this discussion and approve or reject it in the admin panel.</strong>
          </p>
        </div>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
          This is an automated notification from Investo Patronus moderation system.
        </p>
      </div>
    `;

    // Validate subject doesn't contain newlines
    const subject = `New Discussion Pending Moderation: ${data.title.substring(0, 50)}${data.title.length > 50 ? '...' : ''}`;
    if (/[\r\n]/.test(subject)) {
      return new Response(
        JSON.stringify({ error: 'Invalid characters in input' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "Investo Patronus <info@investopatronus.com>",
      to: ["info@investopatronus.com"],
      subject,
      html: htmlContent,
    });

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message || 'Failed to send email');
    }

    console.log("Moderation email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-discussion-moderation-email function:", error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while sending notification' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
