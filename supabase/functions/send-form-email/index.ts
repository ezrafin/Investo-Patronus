import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FormEmailRequest {
  type: 'job_application' | 'contact' | 'bug_report';
  data: Record<string, any>;
}

function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting via IP
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || '0.0.0.0';
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    );

    const { data: allowed } = await supabase.rpc('check_rate_limit', {
      p_ip_address: clientIp,
      p_action_type: 'send_form_email',
      p_max_attempts: 5,
      p_window_seconds: 3600,
    });

    if (allowed === false) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    let requestData: FormEmailRequest;
    try {
      requestData = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { type, data } = requestData;

    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    let subject = '';
    let htmlContent = '';
    
    switch (type) {
      case 'job_application':
        subject = `Job Application: ${escapeHtml(data.position)} - ${escapeHtml(data.fullName)}`;
        htmlContent = `
          <h2>New Job Application</h2>
          <p><strong>Position:</strong> ${escapeHtml(data.position)}</p>
          <p><strong>Full Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email) || 'Not provided'}</p>
          ${data.cvUrl && isValidUrl(data.cvUrl) ? `<p><strong>CV:</strong> <a href="${escapeHtml(data.cvUrl)}">Download CV</a></p>` : ''}
          ${data.links && Array.isArray(data.links) && data.links.length > 0 ? `
            <p><strong>Links:</strong></p>
            <ul>
              ${data.links.filter((link: string) => isValidUrl(link)).map((link: string) => `<li><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></li>`).join('')}
            </ul>
          ` : ''}
        `;
        break;
        
      case 'contact':
        subject = `Contact Form: ${escapeHtml(data.subject)}`;
        htmlContent = `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message)}</p>
        `;
        break;
        
      case 'bug_report':
        subject = `Bug Report from ${escapeHtml(data.userName)}`;
        htmlContent = `
          <h2>Bug Report</h2>
          <p><strong>Reporter:</strong> ${escapeHtml(data.userName)} (${escapeHtml(data.userEmail)})</p>
          <p><strong>User ID:</strong> ${escapeHtml(data.userId)}</p>
          <p><strong>Page URL:</strong> ${escapeHtml(data.pageUrl) || 'Not provided'}</p>
          <p><strong>Browser:</strong> ${escapeHtml(data.browser) || 'Not provided'}</p>
          <p><strong>Description:</strong></p>
          <p>${escapeHtml(data.description)}</p>
          <p><strong>Steps to Reproduce:</strong></p>
          <p>${escapeHtml(data.steps) || 'Not provided'}</p>
          <p><strong>Expected Behavior:</strong></p>
          <p>${escapeHtml(data.expected) || 'Not provided'}</p>
          <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
        `;
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid form type' }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
    }

    // Validate subject doesn't contain newlines (header injection)
    if (/[\r\n]/.test(subject)) {
      return new Response(
        JSON.stringify({ error: 'Invalid characters in input' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "Investo Patronus <info@investopatronus.com>",
      to: ["support@investopatronus.com"],
      subject,
      html: htmlContent,
    });

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message || 'Failed to send email');
    }

    console.log("Form email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-form-email function:", error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
