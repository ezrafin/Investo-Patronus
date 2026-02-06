import type { SupportedLanguage } from '@/lib/i18n';
import { logger } from '@/lib/logger';

// Brand keywords that should be included in all languages
const BRAND_KEYWORDS = 'invest, investo, investo patronus, patronus';

// Page type for keyword customization
export type PageType = 'home' | 'markets' | 'news' | 'analytics' | 'forum' | 'companies' | 'community' | 'courses' | 'about' | 'default';

/**
 * Get SEO keywords for a specific language and page type
 * Russian language has priority with more keywords (40-50% more)
 */
export function getKeywordsForLanguage(language: SupportedLanguage, pageType: PageType = 'default'): string {
  // Brand keywords are always included
  const brandKeywords = BRAND_KEYWORDS;

  // Get language-specific keywords
  let languageKeywords = '';
  
  switch (language) {
    case 'ru': {
      // Russian - most comprehensive list (priority)
      const investmentKeywords = 'куда инвестировать, инвестиционные возможности, лучшие инвестиции, инвестиционные советы, инвестиционные рекомендации, куда вложить деньги, во что инвестировать, инвестиционные идеи, инвестиционные стратегии, инвестиционные решения';
      const brokerKeywords = 'отзывы о брокерах, проверка брокера, рейтинг брокеров, надежный брокер, лицензированный брокер, сравнение брокеров, проверка брокера на надежность, рейтинг доверия брокера, проверка инвестиционной компании, верификация брокера';
      const forumKeywords = 'финансовый форум, задать вопрос про финансы, инвестиционный форум, форум про инвестиции, финансовое сообщество, инвестиционное сообщество, обсуждение инвестиций, форум для инвесторов, задать вопрос инвестору';
      const generalKeywords = 'финансовые рынки, анализ рынка, криптотрейдинг, инвестиционная аналитика, финансовые данные, торговая платформа, инвестиционное образование, финансовые новости, рыночные новости, инвестиционные новости';
      
      // Page-specific keywords
      switch (pageType) {
        case 'markets':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, анализ рынка, инвестиционные возможности, рыночные тренды, инвестиционные исследования`;
          break;
        case 'news':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, финансовые новости, рыночные новости, инвестиционные новости, новости рынка`;
          break;
        case 'analytics':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, инвестиционные исследования, финансовый анализ, аналитика рынка, инвестиционные стратегии`;
          break;
        case 'forum':
          languageKeywords = `${forumKeywords}, ${investmentKeywords}, ${generalKeywords}, обсуждение инвестиций, финансовые вопросы`;
          break;
        case 'companies':
          languageKeywords = `${brokerKeywords}, ${investmentKeywords}, ${generalKeywords}, проверка инвестиционной компании, рейтинг финансовых компаний`;
          break;
        case 'community':
          languageKeywords = `${forumKeywords}, ${investmentKeywords}, ${generalKeywords}, инвестиционное сообщество`;
          break;
        case 'courses':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, инвестиционное образование, обучение инвестициям, курсы по инвестициям, финансовая грамотность`;
          break;
        default:
          languageKeywords = `${investmentKeywords}, ${brokerKeywords}, ${forumKeywords}, ${generalKeywords}`;
      }
      break;
    }
    
    case 'en': {
      // English
      const investmentKeywords = 'where to invest, investment opportunities, best investments, investment advice, investment recommendations, investment options, investment ideas, investment strategies';
      const brokerKeywords = 'broker review, broker verification, check broker, verify broker, broker rating, trusted broker, regulated broker, broker comparison, broker evaluation, broker trust score, verify investment company';
      const forumKeywords = 'financial forum, ask finance question, investment forum, finance Q&A, financial community, investment community, finance discussion, ask investment question, financial advice forum';
      const generalKeywords = 'financial markets, stock market analysis, crypto trading, investment insights, market data, financial analytics, trading platform, investment education, financial news, market news, investment news';
      
      switch (pageType) {
        case 'markets':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, market analysis, investment opportunities, market trends, investment research`;
          break;
        case 'news':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, financial news, market news, investment news, market updates`;
          break;
        case 'analytics':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, investment research, financial analysis, market analytics, investment strategies`;
          break;
        case 'forum':
          languageKeywords = `${forumKeywords}, ${investmentKeywords}, ${generalKeywords}, investment discussion, finance questions`;
          break;
        case 'companies':
          languageKeywords = `${brokerKeywords}, ${investmentKeywords}, ${generalKeywords}, verify investment company, financial company ratings`;
          break;
        case 'community':
          languageKeywords = `${forumKeywords}, ${investmentKeywords}, ${generalKeywords}, investment community`;
          break;
        case 'courses':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, investment education, learn to invest, investment courses, financial literacy`;
          break;
        default:
          languageKeywords = `${investmentKeywords}, ${brokerKeywords}, ${forumKeywords}, ${generalKeywords}`;
      }
      break;
    }
    
    case 'pl': {
      // Polish
      const investmentKeywords = 'gdzie inwestować, możliwości inwestycyjne, najlepsze inwestycje, porady inwestycyjne, rekomendacje inwestycyjne, opcje inwestycyjne, pomysły inwestycyjne, strategie inwestycyjne';
      const brokerKeywords = 'opinie o brokerach, weryfikacja brokera, ocena brokera, zaufany broker, regulowany broker, porównanie brokerów, sprawdzenie brokera, ocena zaufania brokera, weryfikacja firmy inwestycyjnej';
      const forumKeywords = 'forum finansowe, zadaj pytanie o finanse, forum inwestycyjne, społeczność finansowa, społeczność inwestycyjna, dyskusja o inwestycjach, forum dla inwestorów';
      const generalKeywords = 'rynki finansowe, analiza rynku, handel kryptowalutami, analityka inwestycyjna, platforma handlowa, edukacja inwestycyjna, wiadomości finansowe, wiadomości rynkowe';
      
      switch (pageType) {
        case 'markets':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, analiza rynku, możliwości inwestycyjne, trendy rynkowe`;
          break;
        case 'news':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, wiadomości finansowe, wiadomości rynkowe, wiadomości inwestycyjne`;
          break;
        case 'analytics':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, badania inwestycyjne, analiza finansowa, strategie inwestycyjne`;
          break;
        case 'forum':
          languageKeywords = `${forumKeywords}, ${investmentKeywords}, ${generalKeywords}, dyskusja o inwestycjach`;
          break;
        case 'companies':
          languageKeywords = `${brokerKeywords}, ${investmentKeywords}, ${generalKeywords}, weryfikacja firmy inwestycyjnej`;
          break;
        case 'community':
          languageKeywords = `${forumKeywords}, ${investmentKeywords}, ${generalKeywords}, społeczność inwestycyjna`;
          break;
        case 'courses':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, edukacja inwestycyjna, kursy inwestycyjne`;
          break;
        default:
          languageKeywords = `${investmentKeywords}, ${brokerKeywords}, ${forumKeywords}, ${generalKeywords}`;
      }
      break;
    }
    
    case 'de': {
      // German
      const investmentKeywords = 'wo investieren, Investitionsmöglichkeiten, beste Investitionen, Anlageberatung, Investitionsempfehlungen, Anlageoptionen, Investitionsideen, Anlagestrategien';
      const brokerKeywords = 'Broker-Bewertung, Broker-Verifizierung, Broker prüfen, vertrauenswürdiger Broker, regulierter Broker, Broker-Vergleich, Broker-Überprüfung, Broker-Vertrauensbewertung, Investmentfirma prüfen';
      const forumKeywords = 'Finanzforum, Finanzfrage stellen, Investmentforum, Finanz-Community, Investment-Community, Finanzdiskussion, Anlegerforum';
      const generalKeywords = 'Finanzmärkte, Marktanalyse, Kryptohandel, Investitionsanalysen, Handelsplattform, Investitionsbildung, Finanznachrichten, Marktnachrichten';
      
      switch (pageType) {
        case 'markets':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, Marktanalyse, Investitionsmöglichkeiten, Markttrends`;
          break;
        case 'news':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, Finanznachrichten, Marktnachrichten, Investitionsnachrichten`;
          break;
        case 'analytics':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, Investitionsforschung, Finanzanalyse, Anlagestrategien`;
          break;
        case 'forum':
          languageKeywords = `${forumKeywords}, ${investmentKeywords}, ${generalKeywords}, Investitionsdiskussion`;
          break;
        case 'companies':
          languageKeywords = `${brokerKeywords}, ${investmentKeywords}, ${generalKeywords}, Investmentfirma prüfen`;
          break;
        case 'community':
          languageKeywords = `${forumKeywords}, ${investmentKeywords}, ${generalKeywords}, Investment-Community`;
          break;
        case 'courses':
          languageKeywords = `${investmentKeywords}, ${generalKeywords}, Investitionsbildung, Investitionskurse`;
          break;
        default:
          languageKeywords = `${investmentKeywords}, ${brokerKeywords}, ${forumKeywords}, ${generalKeywords}`;
      }
      break;
    }
    
    default: {
      // Fallback to English for other languages
      const investmentKeywords = 'where to invest, investment opportunities, best investments, investment advice, investment recommendations, investment options, investment ideas, investment strategies';
      const brokerKeywords = 'broker review, broker verification, check broker, verify broker, broker rating, trusted broker, regulated broker, broker comparison';
      const forumKeywords = 'financial forum, ask finance question, investment forum, finance Q&A, financial community, investment community';
      const generalKeywords = 'financial markets, stock market analysis, crypto trading, investment insights, market data, financial analytics, trading platform, investment education';
      languageKeywords = `${investmentKeywords}, ${brokerKeywords}, ${forumKeywords}, ${generalKeywords}`;
    }
  }
  
  // Combine brand keywords with language-specific keywords
  return `${brandKeywords}, ${languageKeywords}`;
}

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  locale?: string;
  alternateLanguages?: Record<SupportedLanguage, string>;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
}

const defaultSEO = {
  title: 'INVESTOPATRONUS — Your Guardian in Global Markets',
  description: 'Professional financial market analytics, real-time data, and expert insights for informed investment decisions.',
  keywords: getKeywordsForLanguage('en', 'home'),
  image: 'https://investopatronus.com/investo.png',
  url: 'https://investopatronus.com',
  type: 'website',
  siteName: 'INVESTOPATRONUS',
  locale: 'en_US',
  twitterCard: 'summary_large_image' as const,
};

export function generateSEOTags(data: SEOData = {}) {
  const title = data.title 
    ? `${data.title} | INVESTOPATRONUS`
    : defaultSEO.title;
  
  const description = data.description || defaultSEO.description;
  const keywords = data.keywords || defaultSEO.keywords;
  const image = data.image || defaultSEO.image;
  const url = data.url || defaultSEO.url;
  const type = data.type || defaultSEO.type;
  // Ensure canonical URL is absolute and has no trailing slash (except for root)
  let canonical = data.canonical || url;
  if (canonical && canonical !== 'https://investopatronus.com' && canonical !== 'https://investopatronus.com/' && canonical.endsWith('/')) {
    canonical = canonical.slice(0, -1);
  }
  const locale = data.locale || defaultSEO.locale;
  const siteName = data.siteName || defaultSEO.siteName;
  const twitterCard = data.twitterCard || defaultSEO.twitterCard;

  const robots = [
    data.noindex ? 'noindex' : 'index',
    data.nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  return {
    title,
    description,
    keywords,
    image,
    url,
    type,
    author: data.author,
    publishedTime: data.publishedTime,
    modifiedTime: data.modifiedTime,
    robots,
    canonical,
    locale,
    siteName,
    twitterCard,
    alternateLanguages: data.alternateLanguages,
    twitterSite: data.twitterSite,
    twitterCreator: data.twitterCreator,
  };
}

export function updateDocumentHead(seoData: SEOData) {
  try {
    const tags = generateSEOTags(seoData);

    // Update title
    if (document.title !== tags.title) {
      document.title = tags.title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      try {
        let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attribute, name);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      } catch (error) {
        logger.error(`Error updating meta tag ${name}:`, error);
      }
    };

    // Basic meta tags
    updateMetaTag('description', tags.description);
    if (tags.keywords) {
      updateMetaTag('keywords', tags.keywords);
    }
    updateMetaTag('robots', tags.robots);

    // Open Graph tags
    updateMetaTag('og:title', tags.title, 'property');
    updateMetaTag('og:description', tags.description, 'property');
    updateMetaTag('og:image', tags.image, 'property');
    updateMetaTag('og:url', tags.url, 'property');
    updateMetaTag('og:type', tags.type, 'property');
    updateMetaTag('og:locale', tags.locale, 'property');
    updateMetaTag('og:site_name', tags.siteName, 'property');
    
    if (tags.type === 'article') {
      if (tags.author) {
        updateMetaTag('article:author', tags.author, 'property');
      }
      if (tags.publishedTime) {
        updateMetaTag('article:published_time', tags.publishedTime, 'property');
      }
      if (tags.modifiedTime) {
        updateMetaTag('article:modified_time', tags.modifiedTime, 'property');
      }
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', tags.twitterCard);
    updateMetaTag('twitter:title', tags.title);
    updateMetaTag('twitter:description', tags.description);
    updateMetaTag('twitter:image', tags.image);
    if (tags.twitterSite) {
      updateMetaTag('twitter:site', tags.twitterSite);
    }
    if (tags.twitterCreator) {
      updateMetaTag('twitter:creator', tags.twitterCreator);
    }

    // Hreflang tags for alternate languages
    // Only add hreflang if alternate language versions actually exist
    // Remove any existing hreflang tags that point to the same URL (incorrect implementation)
    if (tags.alternateLanguages && Object.keys(tags.alternateLanguages).length > 0) {
      // Remove existing incorrect hreflang tags first
      const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingHreflang.forEach((link) => {
        const href = link.getAttribute('href');
        const hreflang = link.getAttribute('hreflang');
        // Remove if it points to the same URL as current page (incorrect)
        if (href === tags.url && hreflang !== 'x-default') {
          link.remove();
        }
      });

      // Add x-default hreflang
      try {
        let defaultHreflang = document.querySelector('link[rel="alternate"][hreflang="x-default"]') as HTMLLinkElement;
        if (!defaultHreflang) {
          defaultHreflang = document.createElement('link');
          defaultHreflang.setAttribute('rel', 'alternate');
          defaultHreflang.setAttribute('hreflang', 'x-default');
          document.head.appendChild(defaultHreflang);
        }
        defaultHreflang.setAttribute('href', tags.url);
      } catch (error) {
        logger.error('Error updating x-default hreflang:', error);
      }

      // Add language-specific hreflang tags only if URLs are different
      Object.entries(tags.alternateLanguages).forEach(([lang, langUrl]) => {
        // Only add if URL is different from current page
        if (langUrl !== tags.url) {
          try {
            let hreflangLink = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement;
            if (!hreflangLink) {
              hreflangLink = document.createElement('link');
              hreflangLink.setAttribute('rel', 'alternate');
              hreflangLink.setAttribute('hreflang', lang);
              document.head.appendChild(hreflangLink);
            }
            hreflangLink.setAttribute('href', langUrl);
          } catch (error) {
            logger.error(`Error updating hreflang for ${lang}:`, error);
          }
        }
      });
    } else {
      // Remove all hreflang tags if no alternate languages are provided
      const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingHreflang.forEach((link) => link.remove());
    }

    // Canonical URL
    try {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', tags.canonical);
    } catch (error) {
      logger.error('Error updating canonical URL:', error);
    }
  } catch (error) {
    logger.error('Error updating document head:', error);
  }
}

