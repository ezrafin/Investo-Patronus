import type { SupportedLanguage } from '@/lib/i18n';
import type { PageType } from './seo';

/**
 * Google Ads Match Types
 */
export type MatchType = 'exact' | 'phrase' | 'broad' | 'broad_modifier';

/**
 * Keyword category for grouping
 */
export type KeywordCategory = 'investment' | 'broker' | 'forum' | 'education' | 'analytics' | 'news' | 'brand';

/**
 * Regional variant for country-specific keywords
 */
export type RegionalVariant = 'default' | 'DE' | 'AT' | 'CH' | 'GB' | 'IE' | 'PL' | 'RU';

/**
 * Google Ads Keyword structure
 */
export interface GoogleAdsKeyword {
  keyword: string;
  matchType: MatchType;
  category: KeywordCategory;
  language: SupportedLanguage;
  region?: RegionalVariant;
  priority: 'high' | 'medium' | 'low';
}

/**
 * Get Google Ads keywords for a specific language, category and region
 * Returns array of keywords with different match types
 */
export function getGoogleAdsKeywords(
  language: SupportedLanguage,
  category: KeywordCategory,
  region: RegionalVariant = 'default'
): GoogleAdsKeyword[] {
  const keywords: GoogleAdsKeyword[] = [];

  // Brand keywords (always high priority)
  const brandKeywords = getBrandKeywords(language);
  keywords.push(...brandKeywords);

  // Category-specific keywords
  switch (category) {
    case 'investment':
      keywords.push(...getInvestmentKeywords(language, region));
      break;
    case 'broker':
      keywords.push(...getBrokerKeywords(language, region));
      break;
    case 'forum':
      keywords.push(...getForumKeywords(language, region));
      break;
    case 'education':
      keywords.push(...getEducationKeywords(language, region));
      break;
    case 'analytics':
      keywords.push(...getAnalyticsKeywords(language, region));
      break;
    case 'news':
      keywords.push(...getNewsKeywords(language, region));
      break;
  }

  return keywords;
}

/**
 * Brand keywords - always included
 */
function getBrandKeywords(language: SupportedLanguage): GoogleAdsKeyword[] {
  const baseKeywords = ['invest', 'investo', 'investo patronus', 'patronus'];
  
  return baseKeywords.flatMap(keyword => [
    { keyword: `[${keyword}]`, matchType: 'exact' as MatchType, category: 'brand' as KeywordCategory, language, priority: 'high' as const },
    { keyword: `"${keyword}"`, matchType: 'phrase' as MatchType, category: 'brand' as KeywordCategory, language, priority: 'high' as const },
    { keyword: `+${keyword.split(' ').join(' +')}`, matchType: 'broad_modifier' as MatchType, category: 'brand' as KeywordCategory, language, priority: 'high' as const },
  ]);
}

/**
 * Investment keywords with commercial intent
 */
function getInvestmentKeywords(language: SupportedLanguage, region: RegionalVariant): GoogleAdsKeyword[] {
  const keywords: GoogleAdsKeyword[] = [];

  switch (language) {
    case 'ru': {
      // High priority - commercial intent
      const highPriority = [
        'куда инвестировать деньги',
        'куда вложить деньги',
        'во что инвестировать',
        'лучшие инвестиции 2024',
        'куда инвестировать в 2024',
        'куда вложить деньги в 2024',
        'куда инвестировать начинающему',
        'куда вложить деньги начинающему',
        'куда инвестировать небольшую сумму',
        'куда вложить 10000 рублей',
        'куда вложить 50000 рублей',
        'куда инвестировать в России',
        'куда вложить деньги в России',
      ];

      // Medium priority - informational
      const mediumPriority = [
        'инвестиционные возможности',
        'инвестиционные идеи',
        'инвестиционные стратегии',
        'инвестиционные советы',
        'инвестиционные рекомендации',
        'инвестиционные решения',
        'куда инвестировать сейчас',
        'куда вложить деньги сейчас',
        'куда инвестировать в кризис',
        'куда вложить деньги в кризис',
        'куда инвестировать для начинающих',
        'куда вложить деньги для начинающих',
        'куда инвестировать с минимальными рисками',
        'куда вложить деньги с минимальными рисками',
      ];

      // Question keywords
      const questionKeywords = [
        'куда инвестировать?',
        'куда вложить деньги?',
        'во что инвестировать?',
        'куда лучше инвестировать?',
        'куда лучше вложить деньги?',
        'куда инвестировать начинающему?',
        'куда вложить деньги начинающему?',
        'куда инвестировать в 2024?',
        'куда вложить деньги в 2024?',
        'куда инвестировать в России?',
        'куда вложить деньги в России?',
        'куда инвестировать небольшую сумму?',
        'куда вложить небольшую сумму?',
      ];

      // Long-tail keywords
      const longTail = [
        'куда инвестировать деньги в 2024 году',
        'куда вложить деньги в 2024 году',
        'куда инвестировать деньги начинающему инвестору',
        'куда вложить деньги начинающему инвестору',
        'куда инвестировать деньги с минимальными рисками',
        'куда вложить деньги с минимальными рисками',
        'куда инвестировать деньги в России в 2024',
        'куда вложить деньги в России в 2024',
        'куда инвестировать небольшую сумму денег',
        'куда вложить небольшую сумму денег',
        'куда инвестировать деньги для пассивного дохода',
        'куда вложить деньги для пассивного дохода',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'investment', language, 'high'));
      keywords.push(...createKeywordVariants(mediumPriority, 'investment', language, 'medium'));
      keywords.push(...createKeywordVariants(questionKeywords, 'investment', language, 'high'));
      keywords.push(...createKeywordVariants(longTail, 'investment', language, 'medium'));
      break;
    }

    case 'en': {
      const highPriority = [
        'where to invest money',
        'where to invest',
        'best investments 2024',
        'where to invest in 2024',
        'where to invest for beginners',
        'where to invest small amount',
        'where to invest 10000',
        'where to invest 50000',
        'where to invest in UK',
        'where to invest in Ireland',
      ];

      const mediumPriority = [
        'investment opportunities',
        'investment ideas',
        'investment strategies',
        'investment advice',
        'investment recommendations',
        'where to invest now',
        'where to invest in crisis',
        'where to invest with low risk',
      ];

      const questionKeywords = [
        'where to invest?',
        'where should I invest?',
        'where to invest money?',
        'where to invest for beginners?',
        'where to invest in 2024?',
        'where to invest in UK?',
        'where to invest in Ireland?',
      ];

      const longTail = [
        'where to invest money in 2024',
        'where to invest money for beginners',
        'where to invest money with low risk',
        'where to invest small amount of money',
        'where to invest money in UK 2024',
        'where to invest money in Ireland 2024',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'investment', language, 'high', region));
      keywords.push(...createKeywordVariants(mediumPriority, 'investment', language, 'medium', region));
      keywords.push(...createKeywordVariants(questionKeywords, 'investment', language, 'high', region));
      keywords.push(...createKeywordVariants(longTail, 'investment', language, 'medium', region));
      break;
    }

    case 'pl': {
      const highPriority = [
        'gdzie inwestować pieniądze',
        'gdzie inwestować',
        'najlepsze inwestycje 2024',
        'gdzie inwestować w 2024',
        'gdzie inwestować dla początkujących',
        'gdzie inwestować małą kwotę',
        'gdzie inwestować w Polsce',
      ];

      const mediumPriority = [
        'możliwości inwestycyjne',
        'pomysły inwestycyjne',
        'strategie inwestycyjne',
        'porady inwestycyjne',
        'gdzie inwestować teraz',
        'gdzie inwestować z niskim ryzykiem',
      ];

      const questionKeywords = [
        'gdzie inwestować?',
        'gdzie inwestować pieniądze?',
        'gdzie inwestować dla początkujących?',
        'gdzie inwestować w 2024?',
        'gdzie inwestować w Polsce?',
      ];

      const longTail = [
        'gdzie inwestować pieniądze w 2024',
        'gdzie inwestować pieniądze dla początkujących',
        'gdzie inwestować pieniądze z niskim ryzykiem',
        'gdzie inwestować małą kwotę pieniędzy',
        'gdzie inwestować pieniądze w Polsce 2024',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'investment', language, 'high'));
      keywords.push(...createKeywordVariants(mediumPriority, 'investment', language, 'medium'));
      keywords.push(...createKeywordVariants(questionKeywords, 'investment', language, 'high'));
      keywords.push(...createKeywordVariants(longTail, 'investment', language, 'medium'));
      break;
    }

    case 'de': {
      // Regional variants for German
      const isAustria = region === 'AT';
      const isSwitzerland = region === 'CH';
      const regionSuffix = isAustria ? ' in Österreich' : isSwitzerland ? ' in der Schweiz' : ' in Deutschland';

      const highPriority = [
        'wo investieren',
        'wo Geld investieren',
        `wo investieren${regionSuffix}`,
        'beste Investitionen 2024',
        'wo investieren 2024',
        'wo investieren für Anfänger',
        `wo investieren${regionSuffix} 2024`,
      ];

      const mediumPriority = [
        'Investitionsmöglichkeiten',
        'Investitionsideen',
        'Anlagestrategien',
        'Anlageberatung',
        'wo jetzt investieren',
        'wo investieren mit niedrigem Risiko',
      ];

      const questionKeywords = [
        'wo investieren?',
        'wo Geld investieren?',
        `wo investieren${regionSuffix}?`,
        'wo investieren für Anfänger?',
        'wo investieren 2024?',
      ];

      const longTail = [
        `wo Geld investieren${regionSuffix} 2024`,
        'wo Geld investieren für Anfänger',
        'wo Geld investieren mit niedrigem Risiko',
        'wo kleine Summe investieren',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'investment', language, 'high', region));
      keywords.push(...createKeywordVariants(mediumPriority, 'investment', language, 'medium', region));
      keywords.push(...createKeywordVariants(questionKeywords, 'investment', language, 'high', region));
      keywords.push(...createKeywordVariants(longTail, 'investment', language, 'medium', region));
      break;
    }
  }

  return keywords;
}

/**
 * Broker verification keywords - highest commercial intent
 */
function getBrokerKeywords(language: SupportedLanguage, region: RegionalVariant): GoogleAdsKeyword[] {
  const keywords: GoogleAdsKeyword[] = [];

  switch (language) {
    case 'ru': {
      const highPriority = [
        'проверка брокера',
        'отзывы о брокерах',
        'рейтинг брокеров',
        'проверка брокера на надежность',
        'надежный брокер',
        'лицензированный брокер',
        'лучший брокер',
        'лучший брокер 2024',
        'топ брокеров',
        'топ брокеров 2024',
        'сравнение брокеров',
        'как выбрать брокера',
        'как проверить брокера',
        'верификация брокера',
        'проверка инвестиционной компании',
        'рейтинг доверия брокера',
      ];

      const questionKeywords = [
        'как проверить брокера?',
        'как выбрать брокера?',
        'какой брокер лучше?',
        'какой брокер надежный?',
        'как проверить брокера на надежность?',
        'где проверить брокера?',
        'где найти отзывы о брокерах?',
        'как проверить лицензию брокера?',
      ];

      const longTail = [
        'как проверить брокера перед открытием счета',
        'как выбрать надежного брокера для начинающих',
        'где найти отзывы о брокерах в России',
        'как проверить брокера на мошенничество',
        'рейтинг надежности брокеров в России',
        'как проверить лицензию брокера в России',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'broker', language, 'high'));
      keywords.push(...createKeywordVariants(questionKeywords, 'broker', language, 'high'));
      keywords.push(...createKeywordVariants(longTail, 'broker', language, 'high'));
      break;
    }

    case 'en': {
      const highPriority = [
        'broker review',
        'broker verification',
        'check broker',
        'verify broker',
        'broker rating',
        'trusted broker',
        'regulated broker',
        'best broker',
        'best broker 2024',
        'top brokers',
        'top brokers 2024',
        'broker comparison',
        'how to choose broker',
        'how to verify broker',
        'verify investment company',
      ];

      const questionKeywords = [
        'how to verify broker?',
        'how to choose broker?',
        'which broker is best?',
        'which broker is trusted?',
        'how to check broker?',
        'where to check broker?',
        'where to find broker reviews?',
        'how to verify broker license?',
      ];

      const longTail = [
        'how to verify broker before opening account',
        'how to choose trusted broker for beginners',
        'where to find broker reviews in UK',
        'how to check broker for scam',
        'broker trust rating in UK',
        'how to verify broker license in UK',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'broker', language, 'high', region));
      keywords.push(...createKeywordVariants(questionKeywords, 'broker', language, 'high', region));
      keywords.push(...createKeywordVariants(longTail, 'broker', language, 'high', region));
      break;
    }

    case 'pl': {
      const highPriority = [
        'weryfikacja brokera',
        'opinie o brokerach',
        'ocena brokera',
        'zaufany broker',
        'regulowany broker',
        'najlepszy broker',
        'najlepszy broker 2024',
        'top brokerzy',
        'porównanie brokerów',
        'jak wybrać brokera',
        'jak sprawdzić brokera',
        'weryfikacja firmy inwestycyjnej',
      ];

      const questionKeywords = [
        'jak sprawdzić brokera?',
        'jak wybrać brokera?',
        'jaki broker jest najlepszy?',
        'jaki broker jest zaufany?',
        'gdzie sprawdzić brokera?',
        'gdzie znaleźć opinie o brokerach?',
      ];

      const longTail = [
        'jak sprawdzić brokera przed otwarciem konta',
        'jak wybrać zaufanego brokera dla początkujących',
        'gdzie znaleźć opinie o brokerach w Polsce',
        'jak sprawdzić brokera na oszustwo',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'broker', language, 'high'));
      keywords.push(...createKeywordVariants(questionKeywords, 'broker', language, 'high'));
      keywords.push(...createKeywordVariants(longTail, 'broker', language, 'high'));
      break;
    }

    case 'de': {
      const isAustria = region === 'AT';
      const isSwitzerland = region === 'CH';
      const regionSuffix = isAustria ? ' Österreich' : isSwitzerland ? ' Schweiz' : ' Deutschland';

      const highPriority = [
        'Broker prüfen',
        'Broker-Bewertung',
        'Broker-Verifizierung',
        'vertrauenswürdiger Broker',
        'regulierter Broker',
        'bester Broker',
        'bester Broker 2024',
        'Top Broker',
        'Broker-Vergleich',
        'wie Broker wählen',
        'wie Broker prüfen',
        `Broker prüfen${regionSuffix}`,
      ];

      const questionKeywords = [
        'wie Broker prüfen?',
        'wie Broker wählen?',
        'welcher Broker ist der beste?',
        'welcher Broker ist vertrauenswürdig?',
        'wo Broker prüfen?',
        `wo Broker prüfen${regionSuffix}?`,
      ];

      const longTail = [
        'wie Broker vor Kontoeröffnung prüfen',
        'wie vertrauenswürdigen Broker für Anfänger wählen',
        `wo Broker-Bewertungen${regionSuffix} finden`,
      ];

      keywords.push(...createKeywordVariants(highPriority, 'broker', language, 'high', region));
      keywords.push(...createKeywordVariants(questionKeywords, 'broker', language, 'high', region));
      keywords.push(...createKeywordVariants(longTail, 'broker', language, 'high', region));
      break;
    }
  }

  return keywords;
}

/**
 * Forum and community keywords
 */
function getForumKeywords(language: SupportedLanguage, region: RegionalVariant): GoogleAdsKeyword[] {
  const keywords: GoogleAdsKeyword[] = [];

  switch (language) {
    case 'ru': {
      const highPriority = [
        'финансовый форум',
        'инвестиционный форум',
        'форум про инвестиции',
        'форум для инвесторов',
        'задать вопрос про финансы',
        'задать вопрос инвестору',
        'обсуждение инвестиций',
        'финансовое сообщество',
        'инвестиционное сообщество',
      ];

      const questionKeywords = [
        'где задать вопрос про финансы?',
        'где задать вопрос инвестору?',
        'где обсудить инвестиции?',
        'какой форум про инвестиции?',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'forum', language, 'medium'));
      keywords.push(...createKeywordVariants(questionKeywords, 'forum', language, 'medium'));
      break;
    }

    case 'en': {
      const highPriority = [
        'financial forum',
        'investment forum',
        'ask finance question',
        'ask investment question',
        'finance Q&A',
        'financial community',
        'investment community',
        'finance discussion',
      ];

      const questionKeywords = [
        'where to ask finance question?',
        'where to ask investment question?',
        'where to discuss investments?',
        'which investment forum?',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'forum', language, 'medium', region));
      keywords.push(...createKeywordVariants(questionKeywords, 'forum', language, 'medium', region));
      break;
    }

    case 'pl': {
      const highPriority = [
        'forum finansowe',
        'forum inwestycyjne',
        'zadaj pytanie o finanse',
        'społeczność finansowa',
        'społeczność inwestycyjna',
        'dyskusja o inwestycjach',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'forum', language, 'medium'));
      break;
    }

    case 'de': {
      const highPriority = [
        'Finanzforum',
        'Investmentforum',
        'Finanzfrage stellen',
        'Finanz-Community',
        'Investment-Community',
        'Finanzdiskussion',
        'Anlegerforum',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'forum', language, 'medium', region));
      break;
    }
  }

  return keywords;
}

/**
 * Education keywords
 */
function getEducationKeywords(language: SupportedLanguage, region: RegionalVariant): GoogleAdsKeyword[] {
  const keywords: GoogleAdsKeyword[] = [];

  switch (language) {
    case 'ru': {
      const highPriority = [
        'инвестиционное образование',
        'обучение инвестициям',
        'курсы по инвестициям',
        'курсы по инвестированию',
        'обучение инвестированию',
        'финансовая грамотность',
        'как научиться инвестировать',
        'обучение торговле',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'education', language, 'medium'));
      break;
    }

    case 'en': {
      const highPriority = [
        'investment education',
        'learn to invest',
        'investment courses',
        'investment training',
        'financial literacy',
        'how to learn investing',
        'trading education',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'education', language, 'medium', region));
      break;
    }

    case 'pl': {
      const highPriority = [
        'edukacja inwestycyjna',
        'kursy inwestycyjne',
        'nauka inwestowania',
        'edukacja finansowa',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'education', language, 'medium'));
      break;
    }

    case 'de': {
      const highPriority = [
        'Investitionsbildung',
        'Investitionskurse',
        'Investieren lernen',
        'Finanzbildung',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'education', language, 'medium', region));
      break;
    }
  }

  return keywords;
}

/**
 * Analytics keywords
 */
function getAnalyticsKeywords(language: SupportedLanguage, region: RegionalVariant): GoogleAdsKeyword[] {
  const keywords: GoogleAdsKeyword[] = [];

  switch (language) {
    case 'ru': {
      const highPriority = [
        'инвестиционная аналитика',
        'финансовый анализ',
        'аналитика рынка',
        'инвестиционные исследования',
        'рыночный анализ',
        'анализ инвестиций',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'analytics', language, 'low'));
      break;
    }

    case 'en': {
      const highPriority = [
        'investment analytics',
        'financial analysis',
        'market analytics',
        'investment research',
        'market analysis',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'analytics', language, 'low', region));
      break;
    }

    case 'pl': {
      const highPriority = [
        'analityka inwestycyjna',
        'analiza finansowa',
        'analiza rynku',
        'badania inwestycyjne',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'analytics', language, 'low'));
      break;
    }

    case 'de': {
      const highPriority = [
        'Investitionsanalysen',
        'Finanzanalyse',
        'Marktanalyse',
        'Investitionsforschung',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'analytics', language, 'low', region));
      break;
    }
  }

  return keywords;
}

/**
 * News keywords
 */
function getNewsKeywords(language: SupportedLanguage, region: RegionalVariant): GoogleAdsKeyword[] {
  const keywords: GoogleAdsKeyword[] = [];

  switch (language) {
    case 'ru': {
      const highPriority = [
        'финансовые новости',
        'рыночные новости',
        'инвестиционные новости',
        'новости рынка',
        'финансовые новости сегодня',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'news', language, 'low'));
      break;
    }

    case 'en': {
      const highPriority = [
        'financial news',
        'market news',
        'investment news',
        'market updates',
        'financial news today',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'news', language, 'low', region));
      break;
    }

    case 'pl': {
      const highPriority = [
        'wiadomości finansowe',
        'wiadomości rynkowe',
        'wiadomości inwestycyjne',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'news', language, 'low'));
      break;
    }

    case 'de': {
      const highPriority = [
        'Finanznachrichten',
        'Marktnachrichten',
        'Investitionsnachrichten',
      ];

      keywords.push(...createKeywordVariants(highPriority, 'news', language, 'low', region));
      break;
    }
  }

  return keywords;
}

/**
 * Create keyword variants with different match types
 */
function createKeywordVariants(
  keywords: string[],
  category: KeywordCategory,
  language: SupportedLanguage,
  priority: 'high' | 'medium' | 'low',
  region?: RegionalVariant
): GoogleAdsKeyword[] {
  const variants: GoogleAdsKeyword[] = [];

  keywords.forEach(keyword => {
    // Exact match [keyword]
    variants.push({
      keyword: `[${keyword}]`,
      matchType: 'exact',
      category,
      language,
      region,
      priority,
    });

    // Phrase match "keyword"
    variants.push({
      keyword: `"${keyword}"`,
      matchType: 'phrase',
      category,
      language,
      region,
      priority,
    });

    // Broad modifier +keyword +word +word
    const words = keyword.split(' ').filter(w => w.length > 0);
    if (words.length > 1) {
      const broadModifier = words.map(w => `+${w}`).join(' ');
      variants.push({
        keyword: broadModifier,
        matchType: 'broad_modifier',
        category,
        language,
        region,
        priority,
      });
    }
  });

  return variants;
}

/**
 * Negative keywords list for each category
 */
export function getNegativeKeywords(language: SupportedLanguage, category: KeywordCategory): string[] {
  const commonNegatives = [
    'free', 'download', 'torrent', 'crack', 'hack', 'scam', 'fraud',
    'бесплатно', 'скачать', 'торрент', 'кряк', 'хаки', 'мошенники',
    'kostenlos', 'herunterladen', 'betrug', 'scam',
    'darmowe', 'pobierz', 'oszustwo',
  ];

  const categoryNegatives: Record<KeywordCategory, string[]> = {
    investment: [
      'job', 'career', 'employment', 'работа', 'вакансия', 'Arbeit', 'Stelle',
      'loan', 'credit', 'debt', 'кредит', 'займ', 'долг', 'Kredit', 'Darlehen',
    ],
    broker: [
      'insurance', 'страховка', 'Versicherung', 'ubezpieczenie',
      'real estate', 'недвижимость', 'Immobilien', 'nieruchomości',
    ],
    forum: [
      'dating', 'chat', 'знакомства', 'чат', 'Dating', 'Chat',
    ],
    education: [
      'university', 'college', 'degree', 'университет', 'колледж', 'Universität', 'Hochschule',
    ],
    analytics: [
      'software', 'tool', 'app', 'программа', 'приложение', 'Software', 'App',
    ],
    news: [
      'sports', 'entertainment', 'спорт', 'развлечения', 'Sport', 'Unterhaltung',
    ],
    brand: [],
  };

  return [...commonNegatives, ...(categoryNegatives[category] || [])];
}

/**
 * Export keywords to CSV format for Google Ads
 */
export function exportKeywordsToCSV(keywords: GoogleAdsKeyword[]): string {
  const header = 'Keyword,Match Type,Category,Language,Region,Priority\n';
  const rows = keywords.map(k => 
    `"${k.keyword}",${k.matchType},${k.category},${k.language},${k.region || 'default'},${k.priority}`
  ).join('\n');
  
  return header + rows;
}

/**
 * Export keywords to plain text (one per line) for Google Ads import
 */
export function exportKeywordsToText(keywords: GoogleAdsKeyword[]): string {
  return keywords.map(k => k.keyword).join('\n');
}

/**
 * Get all keywords for a language and page type
 */
export function getAllKeywordsForLanguage(
  language: SupportedLanguage,
  pageType: PageType,
  region: RegionalVariant = 'default'
): GoogleAdsKeyword[] {
  const categories: KeywordCategory[] = [];
  
  // Map page types to categories
  switch (pageType) {
    case 'home':
      categories.push('investment', 'broker', 'forum', 'brand');
      break;
    case 'markets':
      categories.push('investment', 'analytics');
      break;
    case 'news':
      categories.push('news', 'investment');
      break;
    case 'analytics':
      categories.push('analytics', 'investment');
      break;
    case 'forum':
      categories.push('forum', 'investment');
      break;
    case 'companies':
      categories.push('broker', 'investment');
      break;
    case 'community':
      categories.push('forum', 'investment');
      break;
    case 'courses':
      categories.push('education', 'investment');
      break;
    default:
      categories.push('investment', 'broker', 'forum', 'education', 'analytics', 'news', 'brand');
  }

  const allKeywords: GoogleAdsKeyword[] = [];
  categories.forEach(category => {
    allKeywords.push(...getGoogleAdsKeywords(language, category, region));
  });

  return allKeywords;
}

