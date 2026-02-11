import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionEmailRequest {
  email: string;
  language: string;
  type: 'waitlist' | 'newsletter';
}

// Email templates for different languages and types
const emailTemplates: Record<string, Record<string, { subject: string; body: string }>> = {
  waitlist: {
    en: {
      subject: "Thank you for joining our waitlist!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Thank you for joining our waitlist!</h2>
          <p style="color: #666; line-height: 1.6;">
            We're excited to have you on board! You've successfully joined the waitlist for our comprehensive Finance & Markets course.
          </p>
          <p style="color: #666; line-height: 1.6;">
            You'll be among the first to know when the course launches in Q1 2026, and you'll receive exclusive early access pricing.
          </p>
          <p style="color: #666; line-height: 1.6;">
            We appreciate your interest and look forward to helping you on your investment journey!
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Best regards,<br>
            The INVESTOPATRONUS Team
          </p>
        </div>
      `
    },
    ru: {
      subject: "Спасибо за подписку на наш курс!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Спасибо за подписку на наш курс!</h2>
          <p style="color: #666; line-height: 1.6;">
            Мы рады, что вы с нами! Вы успешно подписались на список ожидания нашего комплексного курса по финансам и рынкам.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Вы будете среди первых, кто узнает о запуске курса в Q1 2026, и получите эксклюзивную цену для раннего доступа.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Мы ценим ваш интерес и с нетерпением ждем возможности помочь вам в вашем инвестиционном путешествии!
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            С уважением,<br>
            Команда INVESTOPATRONUS
          </p>
        </div>
      `
    },
    de: {
      subject: "Vielen Dank für Ihre Anmeldung auf der Warteliste!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Vielen Dank für Ihre Anmeldung auf der Warteliste!</h2>
          <p style="color: #666; line-height: 1.6;">
            Wir freuen uns, dass Sie dabei sind! Sie haben sich erfolgreich für die Warteliste unseres umfassenden Finanz- und Marktkurses angemeldet.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Sie werden zu den Ersten gehören, die erfahren, wenn der Kurs im Q1 2026 startet, und Sie erhalten exklusive Frühbucherpreise.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Wir schätzen Ihr Interesse und freuen uns darauf, Sie auf Ihrer Investitionsreise zu unterstützen!
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Mit freundlichen Grüßen,<br>
            Das INVESTOPATRONUS Team
          </p>
        </div>
      `
    },
    fr: {
      subject: "Merci d'avoir rejoint notre liste d'attente !",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Merci d'avoir rejoint notre liste d'attente !</h2>
          <p style="color: #666; line-height: 1.6;">
            Nous sommes ravis de vous compter parmi nous ! Vous avez rejoint avec succès la liste d'attente de notre cours complet sur la finance et les marchés.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Vous serez parmi les premiers informés du lancement du cours au Q1 2026, et vous bénéficierez d'un tarif exclusif d'accès anticipé.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Nous apprécions votre intérêt et avons hâte de vous accompagner dans votre parcours d'investissement !
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Cordialement,<br>
            L'équipe INVESTOPATRONUS
          </p>
        </div>
      `
    },
    zh: {
      subject: "感谢您加入我们的候补名单！",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">感谢您加入我们的候补名单！</h2>
          <p style="color: #666; line-height: 1.6;">
            我们很高兴您能加入！您已成功加入我们综合金融与市场课程的候补名单。
          </p>
          <p style="color: #666; line-height: 1.6;">
            您将成为第一批在2026年第一季度课程启动时收到通知的人，并享受独家早鸟价格。
          </p>
          <p style="color: #666; line-height: 1.6;">
            我们感谢您的关注，期待帮助您开启投资之旅！
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            此致敬礼，<br>
            INVESTOPATRONUS 团队
          </p>
        </div>
      `
    },
    pl: {
      subject: "Dziękujemy za dołączenie do listy oczekujących!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Dziękujemy za dołączenie do listy oczekujących!</h2>
          <p style="color: #666; line-height: 1.6;">
            Cieszymy się, że jesteś z nami! Pomyślnie dołączyłeś do listy oczekujących naszego kompleksowego kursu Finanse i Rynki.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Będziesz wśród pierwszych, którzy dowiedzą się o uruchomieniu kursu w Q1 2026 i otrzymasz ekskluzywną cenę wczesnego dostępu.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Doceniamy Twoje zainteresowanie i z niecierpliwością czekamy na pomoc w Twojej podróży inwestycyjnej!
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Pozdrawiamy,<br>
            Zespół INVESTOPATRONUS
          </p>
        </div>
      `
    },
    es: {
      subject: "¡Gracias por unirte a nuestra lista de espera!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">¡Gracias por unirte a nuestra lista de espera!</h2>
          <p style="color: #666; line-height: 1.6;">
            ¡Estamos emocionados de tenerte a bordo! Te has unido exitosamente a la lista de espera de nuestro curso integral de Finanzas y Mercados.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Serás uno de los primeros en saber cuando el curso se lance en Q1 2026, y recibirás precios exclusivos de acceso anticipado.
          </p>
          <p style="color: #666; line-height: 1.6;">
            ¡Apreciamos tu interés y esperamos ayudarte en tu viaje de inversión!
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Saludos cordiales,<br>
            El equipo de INVESTOPATRONUS
          </p>
        </div>
      `
    }
  },
  newsletter: {
    en: {
      subject: "Welcome to INVESTOPATRONUS newsletter!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Welcome to INVESTOPATRONUS newsletter!</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for subscribing! We're thrilled to have you join our community of informed investors.
          </p>
          <p style="color: #666; line-height: 1.6;">
            You'll now receive daily curated financial news, expert market analytics, and valuable investment insights delivered straight to your inbox.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Stay ahead of the markets with our comprehensive coverage of stocks, crypto, commodities, and global economic trends.
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Best regards,<br>
            The INVESTOPATRONUS Team
          </p>
        </div>
      `
    },
    ru: {
      subject: "Добро пожаловать в рассылку INVESTOPATRONUS!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Добро пожаловать в рассылку INVESTOPATRONUS!</h2>
          <p style="color: #666; line-height: 1.6;">
            Спасибо за подписку! Мы рады, что вы присоединились к нашему сообществу информированных инвесторов.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Теперь вы будете получать ежедневно отобранные финансовые новости, экспертную рыночную аналитику и ценные инвестиционные инсайты прямо на вашу почту.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Будьте впереди рынков с нашим комплексным освещением акций, криптовалют, товаров и глобальных экономических трендов.
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            С уважением,<br>
            Команда INVESTOPATRONUS
          </p>
        </div>
      `
    },
    de: {
      subject: "Willkommen beim INVESTOPATRONUS Newsletter!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Willkommen beim INVESTOPATRONUS Newsletter!</h2>
          <p style="color: #666; line-height: 1.6;">
            Vielen Dank für Ihr Abonnement! Wir freuen uns, dass Sie sich unserer Gemeinschaft informierter Investoren angeschlossen haben.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Sie erhalten nun täglich kuratierte Finanznachrichten, Experten-Marktanalysen und wertvolle Investment-Insights direkt in Ihr Postfach.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Bleiben Sie den Märkten einen Schritt voraus mit unserer umfassenden Berichterstattung über Aktien, Krypto, Rohstoffe und globale Wirtschaftstrends.
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Mit freundlichen Grüßen,<br>
            Das INVESTOPATRONUS Team
          </p>
        </div>
      `
    },
    fr: {
      subject: "Bienvenue dans la newsletter INVESTOPATRONUS !",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Bienvenue dans la newsletter INVESTOPATRONUS !</h2>
          <p style="color: #666; line-height: 1.6;">
            Merci de vous être abonné ! Nous sommes ravis de vous accueillir dans notre communauté d'investisseurs informés.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Vous recevrez désormais quotidiennement des actualités financières sélectionnées, des analyses de marché d'experts et des insights d'investissement précieux directement dans votre boîte de réception.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Restez en avance sur les marchés avec notre couverture complète des actions, crypto-monnaies, matières premières et tendances économiques mondiales.
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Cordialement,<br>
            L'équipe INVESTOPATRONUS
          </p>
        </div>
      `
    },
    zh: {
      subject: "欢迎订阅 INVESTOPATRONUS 新闻通讯！",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">欢迎订阅 INVESTOPATRONUS 新闻通讯！</h2>
          <p style="color: #666; line-height: 1.6;">
            感谢您的订阅！我们很高兴您加入我们见多识广的投资者社区。
          </p>
          <p style="color: #666; line-height: 1.6;">
            您现在将每天收到精选的金融新闻、专家市场分析和有价值的投资见解，直接发送到您的收件箱。
          </p>
          <p style="color: #666; line-height: 1.6;">
            通过我们对股票、加密货币、大宗商品和全球经济趋势的全面报道，保持领先于市场。
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            此致敬礼，<br>
            INVESTOPATRONUS 团队
          </p>
        </div>
      `
    },
    pl: {
      subject: "Witamy w biuletynie INVESTOPATRONUS!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Witamy w biuletynie INVESTOPATRONUS!</h2>
          <p style="color: #666; line-height: 1.6;">
            Dziękujemy za subskrypcję! Cieszymy się, że dołączyłeś do naszej społeczności świadomych inwestorów.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Będziesz teraz otrzymywać codziennie wyselekcjonowane wiadomości finansowe, eksperckie analizy rynkowe i cenne spostrzeżenia inwestycyjne bezpośrednio na swoją skrzynkę.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Wyprzedzaj rynek dzięki naszemu kompleksowemu pokryciu akcji, kryptowalut, surowców i globalnych trendów gospodarczych.
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Pozdrawiamy,<br>
            Zespół INVESTOPATRONUS
          </p>
        </div>
      `
    },
    es: {
      subject: "¡Bienvenido al boletín de INVESTOPATRONUS!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">¡Bienvenido al boletín de INVESTOPATRONUS!</h2>
          <p style="color: #666; line-height: 1.6;">
            ¡Gracias por suscribirte! Estamos emocionados de tenerte en nuestra comunidad de inversionistas informados.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Ahora recibirás diariamente noticias financieras curadas, análisis de mercado de expertos e insights valiosos de inversión directamente en tu bandeja de entrada.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Mantente por delante de los mercados con nuestra cobertura integral de acciones, criptomonedas, materias primas y tendencias económicas globales.
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Saludos cordiales,<br>
            El equipo de INVESTOPATRONUS
          </p>
        </div>
      `
    }
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
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
      p_action_type: 'subscription_email',
      p_max_attempts: 3,
      p_window_seconds: 3600,
    });

    if (allowed === false) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    let requestData: SubscriptionEmailRequest;
    try {
      requestData = await req.json();
    } catch (jsonError) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { email, language, type } = requestData;

    // Validate required fields
    if (!email || !language || !type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: email, language, or type' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address format' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate type
    if (type !== 'waitlist' && type !== 'newsletter') {
      return new Response(
        JSON.stringify({ error: 'Invalid type. Must be "waitlist" or "newsletter"' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get template for language, fallback to English if language not supported
    const lang = language.toLowerCase().split('-')[0]; // Handle 'en-US' -> 'en'
    const supportedLanguages = ['en', 'ru', 'de', 'fr', 'zh', 'pl', 'es'];
    const templateLang = supportedLanguages.includes(lang) ? lang : 'en';
    
    const template = emailTemplates[type]?.[templateLang] || emailTemplates[type]?.en;

    if (!template) {
      return new Response(
        JSON.stringify({ error: 'Template not found for type: ' + type }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email
    const emailResponse = await resend.emails.send({
      from: "Investo Patronus <info@investopatronus.com>",
      to: [email],
      subject: template.subject,
      html: template.body,
    });

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message || 'Failed to send email');
    }

    console.log(`Subscription email sent successfully (${type}, ${templateLang})`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-subscription-email function:", error);
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

