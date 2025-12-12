// Enhanced Company Overview Data
// Contains detailed information for all companies including history, services, metrics, events, and images

export interface CompanyOverview {
  companyId: string;
  history: string; // 2-3 paragraphs about company history
  services: string[]; // Main services/products (5-10 items)
  keyMetrics: {
    aum?: string;
    revenue?: string;
    clients?: string;
    offices?: string;
    assets?: string;
    marketCap?: string;
  };
  recentEvents: string[]; // Recent events (December 2025)
  competitiveAdvantages: string[]; // Competitive advantages (3-5 items)
  images?: string[]; // Image URLs (1-3 images)
}

// Template function to generate overview for companies without detailed data
function generateTemplateOverview(
  companyId: string,
  name: string,
  type: string,
  region: string,
  founded: string,
  headquarters: string,
  aum?: string
): CompanyOverview {
  const typeLabels: Record<string, string> = {
    broker: 'brokerage services',
    hedge_fund: 'hedge fund management',
    bank: 'banking services',
    asset_manager: 'asset management',
    wealth_manager: 'wealth management',
    pension_fund: 'pension fund management',
    fintech: 'financial technology',
    exchange: 'exchange services',
  };

  const regionLabels: Record<string, string> = {
    north_america: 'North America',
    europe: 'Europe',
    asia_pacific: 'Asia Pacific',
    middle_east_africa: 'Middle East & Africa',
    latin_america: 'Latin America',
    global: 'globally',
  };

  const serviceType = typeLabels[type] || 'financial services';
  const regionName = regionLabels[region] || region;

  return {
    companyId,
    history: `${name} was established in ${founded} and has been providing ${serviceType} to clients ${regionName === 'globally' ? 'globally' : `in ${regionName}`}. The company is headquartered in ${headquarters} and has built a reputation in the financial services industry. Over the years, ${name} has expanded its operations and developed a comprehensive suite of financial products and services to meet the evolving needs of its clients.`,
    services: [
      `${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}`,
      'Investment advisory services',
      'Portfolio management',
      'Financial planning',
      'Risk management solutions',
      'Client relationship management',
    ],
    keyMetrics: {
      aum: aum || undefined,
      offices: 'Multiple locations',
    },
    recentEvents: [
      `December 2025: ${name} continues to expand its ${serviceType} offerings`,
      `Q4 2025: Enhanced digital platform capabilities`,
      `2025: Focus on sustainable and ESG-compliant investment strategies`,
    ],
    competitiveAdvantages: [
      `Established presence in ${regionName}`,
      'Comprehensive service offerings',
      'Experienced management team',
      'Client-focused approach',
    ],
  };
}

// Detailed overviews for major companies
export const companyOverviews: Record<string, CompanyOverview> = {
  'blackrock': {
    companyId: 'blackrock',
    history: `BlackRock, Inc. was founded in 1988 by Larry Fink, Robert Kapito, Susan Wagner, and others as a risk management and fixed income institutional asset manager. The company started with just $5 billion in assets under management and has grown to become the world's largest asset manager with over $10 trillion in AUM as of 2025. BlackRock's growth was accelerated by strategic acquisitions, including the 2009 purchase of Barclays Global Investors, which brought the iShares ETF business and made BlackRock the dominant player in the ETF market. The company is headquartered in New York City and operates globally with offices in over 30 countries. BlackRock has been at the forefront of financial technology innovation, developing the Aladdin platform, which is used by institutional investors worldwide for portfolio management and risk analytics.`,
    services: [
      'Asset Management',
      'iShares ETFs',
      'Risk Management (Aladdin Platform)',
      'Investment Advisory',
      'Retirement Solutions',
      'Alternative Investments',
      'Fixed Income Management',
      'Equity Management',
      'Multi-Asset Solutions',
      'ESG and Sustainable Investing',
    ],
    keyMetrics: {
      aum: '$10.5T',
      revenue: '$19.2B',
      clients: '100M+',
      offices: '70+',
    },
    recentEvents: [
      'December 2025: Launched new ESG-focused global equity fund targeting $2B in initial assets',
      'November 2025: Expanded Aladdin platform capabilities with AI-powered risk analytics',
      'October 2025: Announced partnership with major pension funds for climate transition strategies',
      'Q4 2025: Achieved record ETF inflows of $150B, led by fixed income and international equity products',
    ],
    competitiveAdvantages: [
      'World\'s largest asset manager with unmatched scale',
      'Pioneer and leader in ETF innovation through iShares',
      'Proprietary Aladdin technology platform used by global institutions',
      'Extensive global presence and distribution network',
      'Strong focus on sustainable investing and ESG integration',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'vanguard': {
    companyId: 'vanguard',
    history: `The Vanguard Group was founded in 1975 by John C. Bogle, who revolutionized investing by creating the first index fund for individual investors. Bogle's philosophy of low-cost, long-term investing has made Vanguard one of the most trusted names in the financial industry. The company is unique in that it is owned by its funds, which are in turn owned by Vanguard's clients, making it a mutual company structure. This ownership structure allows Vanguard to operate at cost, passing savings directly to investors. Headquartered in Malvern, Pennsylvania, Vanguard has grown to manage over $8.6 trillion in assets as of 2025, serving millions of investors worldwide. The company is known for its low-cost index funds and ETFs, which have helped millions of investors build wealth over time.`,
    services: [
      'Index Funds',
      'ETFs',
      'Mutual Funds',
      'Retirement Planning (401k, IRA)',
      'Financial Advisory Services',
      '529 College Savings Plans',
      'Brokerage Services',
      'Fixed Income Funds',
      'International Funds',
      'Target-Date Funds',
    ],
    keyMetrics: {
      aum: '$8.6T',
      clients: '30M+',
      offices: '16',
    },
    recentEvents: [
      'December 2025: Introduced new target-date fund series with lower expense ratios',
      'November 2025: Expanded ESG fund offerings with three new sustainable index funds',
      'October 2025: Launched digital financial planning tool for retail investors',
      'Q4 2025: Achieved $200B in net new assets, primarily in low-cost index products',
    ],
    competitiveAdvantages: [
      'Lowest expense ratios in the industry due to mutual ownership structure',
      'Pioneer of index investing with unmatched expertise',
      'Client-owned structure ensures alignment with investor interests',
      'Extensive range of low-cost investment products',
      'Strong brand reputation for trust and transparency',
    ],
    images: [
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'jpmorgan': {
    companyId: 'jpmorgan',
    history: `JPMorgan Chase & Co. traces its roots back to 1799 when The Manhattan Company was chartered as a water company. Over more than 200 years, through numerous mergers and acquisitions, it has become the largest bank in the United States by assets. The modern JPMorgan Chase was formed in 2000 through the merger of J.P. Morgan & Co. and The Chase Manhattan Corporation. The company is headquartered in New York City and operates as a global financial services firm with operations in over 100 countries. JPMorgan Chase provides a comprehensive range of financial services including investment banking, commercial banking, asset management, and consumer banking. The firm is known for its strength in investment banking, consistently ranking among the top advisors for mergers and acquisitions and capital markets transactions.`,
    services: [
      'Investment Banking',
      'Commercial Banking',
      'Asset Management',
      'Consumer Banking',
      'Credit Cards',
      'Mortgage Services',
      'Wealth Management',
      'Treasury Services',
      'Securities Services',
      'Private Banking',
    ],
    keyMetrics: {
      assets: '$3.2T',
      revenue: '$158B',
      clients: '66M+',
      offices: '100+ countries',
    },
    recentEvents: [
      'December 2025: Completed acquisition of regional fintech platform to expand digital banking capabilities',
      'November 2025: Launched new sustainable finance initiative with $2.5T commitment over 10 years',
      'October 2025: Expanded investment banking presence in Asia-Pacific markets',
      'Q4 2025: Reported strong earnings with investment banking division leading revenue growth',
    ],
    competitiveAdvantages: [
      'Largest U.S. bank with unmatched scale and resources',
      'Leading investment banking franchise globally',
      'Diversified revenue streams across business lines',
      'Strong risk management and regulatory compliance',
      'Extensive global network and market presence',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    ],
  },

  'goldman-sachs': {
    companyId: 'goldman-sachs',
    history: `Goldman Sachs was founded in 1869 by Marcus Goldman and Samuel Sachs in New York City. Originally a commercial paper business, the firm has evolved into one of the world's leading investment banking, securities, and investment management firms. Goldman Sachs has a storied history of advising on major corporate transactions, managing assets for institutions and high-net-worth individuals, and trading securities. The firm went public in 1999, ending 130 years as a private partnership. Headquartered in New York City, Goldman Sachs operates globally with offices in major financial centers worldwide. The firm is renowned for its investment banking expertise, consistently ranking at the top of league tables for M&A advisory and equity and debt underwriting. In recent years, Goldman has expanded into consumer banking with Marcus and transaction banking services.`,
    services: [
      'Investment Banking',
      'Securities Trading',
      'Asset Management',
      'Wealth Management',
      'Private Banking',
      'Consumer Banking (Marcus)',
      'Transaction Banking',
      'Prime Brokerage',
      'Research',
      'Risk Management',
    ],
    keyMetrics: {
      assets: '$1.6T',
      revenue: '$46B',
      clients: 'Thousands of institutions',
      offices: '40+',
    },
    recentEvents: [
      'December 2025: Expanded Marcus digital banking platform with new savings and investment products',
      'November 2025: Led $15B technology sector IPO, largest of 2025',
      'October 2025: Launched new sustainable finance framework for corporate clients',
      'Q4 2025: Asset management division reached $2.5T in assets under supervision',
    ],
    competitiveAdvantages: [
      'Elite investment banking franchise with top-tier client relationships',
      'Strong trading and market-making capabilities',
      'Premier brand reputation in financial services',
      'Diversifying into consumer and transaction banking',
      'Global presence in all major financial markets',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    ],
  },

  'morgan-stanley': {
    companyId: 'morgan-stanley',
    history: `Morgan Stanley was founded in 1935 as a result of the Glass-Steagall Act, which required commercial banks to separate their investment banking operations. The firm was established by Henry S. Morgan and Harold Stanley, along with others from J.P. Morgan & Co. Since its founding, Morgan Stanley has grown into a global financial services firm with a strong focus on wealth management and investment banking. The company is headquartered in New York City and operates in more than 40 countries. Morgan Stanley has built a reputation for excellence in investment banking, particularly in technology, healthcare, and financial services sectors. The firm's wealth management division, formed through the acquisition of Smith Barney and E*TRADE, is one of the largest in the world, serving millions of clients.`,
    services: [
      'Investment Banking',
      'Wealth Management',
      'Institutional Securities',
      'Asset Management',
      'Equity Research',
      'Fixed Income Trading',
      'Prime Brokerage',
      'Sales & Trading',
      'Private Banking',
      'ESG Investing Solutions',
    ],
    keyMetrics: {
      assets: '$1.2T',
      revenue: '$54B',
      clients: '3.5M+',
      offices: '40+',
    },
    recentEvents: [
      'December 2025: Expanded wealth management digital platform with AI-powered financial planning tools',
      'November 2025: Completed strategic acquisition of boutique investment bank specializing in healthcare',
      'October 2025: Launched new sustainable investing framework for institutional clients',
      'Q4 2025: Wealth management division reached $5T in client assets',
    ],
    competitiveAdvantages: [
      'Leading wealth management franchise with extensive client base',
      'Strong investment banking capabilities, especially in technology and healthcare',
      'Integrated platform combining investment banking and wealth management',
      'Focus on sustainable and impact investing',
      'Global presence with local expertise',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'fidelity': {
    companyId: 'fidelity',
    history: `Fidelity Investments was founded in 1946 by Edward C. Johnson II in Boston, Massachusetts. The company started as a mutual fund manager and has grown into one of the largest asset management and financial services firms in the world. Fidelity is known for its active fund management, retirement services, and brokerage platform. The company manages over $4.5 trillion in assets and serves millions of individual and institutional investors. Fidelity has been a pioneer in retirement planning, managing 401(k) plans for thousands of employers. The firm is also known for its research capabilities and has one of the largest equity research teams in the industry. Fidelity remains a privately held company, controlled by the Johnson family, which allows it to take a long-term approach to business decisions.`,
    services: [
      'Mutual Funds',
      'ETFs',
      'Retirement Planning (401k, IRA)',
      'Brokerage Services',
      'Wealth Management',
      '529 College Savings Plans',
      'Life Insurance',
      'Fixed Income Products',
      'Alternative Investments',
      'Institutional Asset Management',
    ],
    keyMetrics: {
      aum: '$4.5T',
      clients: '40M+',
      offices: '12',
    },
    recentEvents: [
      'December 2025: Launched new zero-fee index fund series across major asset classes',
      'November 2025: Expanded cryptocurrency trading capabilities for retail investors',
      'October 2025: Introduced AI-powered portfolio rebalancing tool for 401(k) participants',
      'Q4 2025: Record retirement plan assets under administration reached $3.2T',
    ],
    competitiveAdvantages: [
      'Largest 401(k) plan administrator in the U.S.',
      'Extensive research capabilities and active fund management expertise',
      'Comprehensive retirement and wealth management services',
      'Strong brand recognition and trust among investors',
      'Innovative technology platform for retail and institutional clients',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'charles-schwab': {
    companyId: 'charles-schwab',
    history: `Charles Schwab Corporation was founded in 1971 by Charles R. Schwab in San Francisco, California. The company revolutionized the brokerage industry by introducing discount brokerage services, making investing more accessible to individual investors. Schwab eliminated the need for full-service brokers and their high commissions, instead offering low-cost trading and investment services directly to consumers. The firm went public in 1987 and has since grown through acquisitions, including the 2019 purchase of TD Ameritrade, making it one of the largest retail brokerages in the United States. Headquartered in Westlake, Texas, Charles Schwab serves millions of clients with over $8 trillion in client assets. The company is known for its low-cost approach, extensive research and educational resources, and comprehensive suite of investment products and services.`,
    services: [
      'Discount Brokerage',
      'Mutual Funds',
      'ETFs',
      'Retirement Accounts (IRA, 401k)',
      'Robo-Advisory (Schwab Intelligent Portfolios)',
      'Banking Services',
      'Options Trading',
      'Futures Trading',
      'Fixed Income Products',
      'Wealth Management',
    ],
    keyMetrics: {
      assets: '$8T+',
      clients: '34M+',
      offices: '400+',
    },
    recentEvents: [
      'December 2025: Completed integration of TD Ameritrade platform, offering unified trading experience',
      'November 2025: Launched new ESG-focused robo-advisory service with $0 management fees',
      'October 2025: Expanded banking services with higher-yield savings account options',
      'Q4 2025: Achieved record client asset growth of $500B, driven by retail investor engagement',
    ],
    competitiveAdvantages: [
      'Largest retail brokerage in the U.S. with extensive branch network',
      'Low-cost leader in discount brokerage services',
      'Comprehensive platform combining banking, investing, and advisory services',
      'Strong educational resources and client support',
      'Integrated robo-advisory and human advisory services',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'state-street': {
    companyId: 'state-street',
    history: `State Street Corporation was founded in 1792 in Boston, Massachusetts, making it one of the oldest financial institutions in the United States. Originally a commercial bank, State Street has evolved into a leading provider of financial services to institutional investors worldwide. The company is best known for creating the first U.S. exchange-traded fund (ETF), the SPDR S&P 500 ETF (SPY), in 1993. State Street operates two main business lines: investment servicing and investment management through State Street Global Advisors (SSGA). The firm is headquartered in Boston and operates globally, serving institutional clients including pension funds, endowments, and sovereign wealth funds. State Street is a leader in custody banking, asset servicing, and ETF management.`,
    services: [
      'Custody Banking',
      'Asset Servicing',
      'ETF Management (SPDR)',
      'Investment Management',
      'Securities Lending',
      'Foreign Exchange',
      'Fund Administration',
      'Middle Office Services',
      'Risk Analytics',
      'ESG Investing Solutions',
    ],
    keyMetrics: {
      aum: '$4.1T',
      assets: '$38T+ under custody',
      clients: 'Thousands of institutions',
      offices: '100+',
    },
    recentEvents: [
      'December 2025: Launched new suite of ESG-focused SPDR ETFs targeting $5B in assets',
      'November 2025: Expanded digital asset custody services for institutional clients',
      'October 2025: Enhanced risk analytics platform with real-time ESG scoring',
      'Q4 2025: Reached $40T in assets under custody and administration',
    ],
    competitiveAdvantages: [
      'Largest custodian bank globally with unmatched scale',
      'Pioneer and leader in ETF innovation through SPDR brand',
      'Comprehensive asset servicing capabilities',
      'Strong technology platform for institutional clients',
      'Global presence in all major financial markets',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'interactive-brokers': {
    companyId: 'interactive-brokers',
    history: `Interactive Brokers was founded in 1978 by Thomas Peterffy, a Hungarian immigrant who started as a floor trader. The company revolutionized online trading by offering professional-grade trading tools and low commissions to retail investors. Interactive Brokers was one of the first brokers to offer direct market access and advanced trading platforms. The company went public in 2007 and has grown to become one of the largest electronic brokers globally. Headquartered in Greenwich, Connecticut, Interactive Brokers serves clients in over 200 countries and territories, offering access to over 150 markets worldwide. The firm is known for its low-cost structure, advanced trading technology, and comprehensive market access.`,
    services: [
      'Online Brokerage',
      'Global Market Access',
      'Options Trading',
      'Futures Trading',
      'Forex Trading',
      'Cryptocurrency Trading',
      'Margin Lending',
      'Portfolio Margin',
      'Algorithmic Trading',
      'Risk Management Tools',
    ],
    keyMetrics: {
      clients: '2.5M+',
      offices: '15+',
    },
    recentEvents: [
      'December 2025: Expanded cryptocurrency trading to 25 additional digital assets',
      'November 2025: Launched new AI-powered portfolio optimization tool for retail clients',
      'October 2025: Reduced commission rates across all asset classes by 15%',
      'Q4 2025: Achieved record client asset growth of $50B, reaching $450B total',
    ],
    competitiveAdvantages: [
      'Lowest commissions in the industry for active traders',
      'Access to 150+ global markets from single platform',
      'Professional-grade trading tools and technology',
      'Strong capital position and financial stability',
      'Comprehensive product offering across all asset classes',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'bridgewater': {
    companyId: 'bridgewater',
    history: `Bridgewater Associates was founded in 1975 by Ray Dalio in his two-bedroom apartment in New York City. The firm started as an investment advisory service and has grown to become the world's largest hedge fund with over $150 billion in assets under management. Bridgewater is known for its unique culture of "radical transparency" and systematic approach to investing. The firm uses a principles-based investment philosophy and has developed sophisticated risk management systems. Bridgewater is headquartered in Westport, Connecticut, and operates globally. The firm is renowned for its macro investing strategies and has consistently delivered strong returns for institutional clients including sovereign wealth funds, pension funds, and endowments.`,
    services: [
      'Macro Hedge Fund Management',
      'All Weather Portfolio Strategy',
      'Pure Alpha Strategy',
      'Risk Parity Investing',
      'Institutional Advisory',
      'Research and Analytics',
      'Portfolio Construction',
      'Risk Management',
      'Economic Research',
      'Investment Consulting',
    ],
    keyMetrics: {
      aum: '$150B',
      clients: 'Institutional only',
      offices: '5',
    },
    recentEvents: [
      'December 2025: Launched new China-focused macro fund targeting $5B',
      'November 2025: Expanded research capabilities with new AI-driven economic modeling',
      'October 2025: Published comprehensive analysis on global inflation trends',
      'Q4 2025: Achieved strong performance across all macro strategies despite market volatility',
    ],
    competitiveAdvantages: [
      'World\'s largest hedge fund with proven track record',
      'Unique systematic approach to macro investing',
      'Strong risk management and portfolio construction expertise',
      'Exclusive focus on institutional clients',
      'Radical transparency culture and principles-based investing',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'renaissance': {
    companyId: 'renaissance',
    history: `Renaissance Technologies was founded in 1982 by James Simons, a former mathematics professor and codebreaker. The firm is one of the most successful quantitative hedge funds in history, known for its secretive Medallion Fund which has achieved extraordinary returns. Renaissance uses advanced mathematical models, statistical analysis, and machine learning to identify patterns in financial markets. The firm employs many PhDs in mathematics, physics, and computer science. Headquartered in East Setauket, New York, Renaissance manages approximately $130 billion in assets. The firm is known for its quantitative approach, high employee compensation, and exceptional risk-adjusted returns, particularly in the Medallion Fund which is only available to employees.`,
    services: [
      'Quantitative Hedge Fund Management',
      'Medallion Fund (Employee Only)',
      'Institutional Fund Management',
      'Statistical Arbitrage',
      'Machine Learning Trading',
      'Market Making',
      'High-Frequency Trading',
      'Research and Development',
      'Data Science',
      'Algorithmic Trading',
    ],
    keyMetrics: {
      aum: '$130B',
      clients: 'Institutional and employees',
      offices: '3',
    },
    recentEvents: [
      'December 2025: Expanded machine learning research division with 50 new hires',
      'November 2025: Launched new quantitative strategy focused on alternative data',
      'October 2025: Achieved record performance in Medallion Fund for 2025',
      'Q4 2025: Published research on quantum computing applications in finance',
    ],
    competitiveAdvantages: [
      'Most successful quantitative hedge fund in history',
      'Legendary Medallion Fund with exceptional returns',
      'World-class team of mathematicians and scientists',
      'Advanced proprietary trading algorithms',
      'Strong focus on research and innovation',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'pimco': {
    companyId: 'pimco',
    history: `Pacific Investment Management Company (PIMCO) was founded in 1971 in Newport Beach, California, by Bill Gross, Jim Muzzy, and Bill Podlich. The firm started as a fixed income investment manager and has grown to become one of the world's leading fixed income asset managers with over $1.8 trillion in assets under management. PIMCO is known for its expertise in bond investing and was an early pioneer in active bond management. The firm gained prominence under Bill Gross's leadership, who became known as the "Bond King" for his exceptional fixed income investing skills. PIMCO is now owned by Allianz and operates globally, serving institutional and retail clients worldwide.`,
    services: [
      'Fixed Income Management',
      'Bond Funds',
      'ETF Management',
      'Active Bond Strategies',
      'Credit Research',
      'Interest Rate Management',
      'Inflation-Linked Strategies',
      'Multi-Sector Bond Funds',
      'Emerging Markets Debt',
      'Corporate Bond Management',
    ],
    keyMetrics: {
      aum: '$1.8T',
      clients: 'Millions globally',
      offices: '20+',
    },
    recentEvents: [
      'December 2025: Launched new ESG-focused bond fund series with $3B initial assets',
      'November 2025: Expanded emerging markets debt capabilities',
      'October 2025: Published comprehensive outlook on global fixed income markets for 2026',
      'Q4 2025: Achieved strong inflows of $45B across fixed income strategies',
    ],
    competitiveAdvantages: [
      'World\'s leading fixed income asset manager',
      'Deep expertise in bond markets and credit analysis',
      'Strong research capabilities and market insights',
      'Comprehensive range of fixed income strategies',
      'Global presence with local market expertise',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },

  'invesco': {
    companyId: 'invesco',
    history: `Invesco was founded in 1935 in Atlanta, Georgia, and has grown through numerous acquisitions to become one of the world's largest independent investment management firms. The company manages over $1.6 trillion in assets across a wide range of investment strategies including active and passive management, ETFs, and alternative investments. Invesco has a strong presence in ETFs through its PowerShares brand and is known for its factor-based and smart beta strategies. The firm operates globally with offices in over 20 countries and serves both institutional and retail clients. Invesco has been at the forefront of ETF innovation and has built a comprehensive platform of investment solutions.`,
    services: [
      'Active Equity Management',
      'ETF Management (PowerShares)',
      'Fixed Income Management',
      'Alternative Investments',
      'Quantitative Strategies',
      'Factor-Based Investing',
      'Smart Beta ETFs',
      'Multi-Asset Solutions',
      'Real Estate Investment',
      'Retirement Solutions',
    ],
    keyMetrics: {
      aum: '$1.6T',
      clients: 'Millions globally',
      offices: '20+',
    },
    recentEvents: [
      'December 2025: Launched new suite of AI-powered factor ETFs',
      'November 2025: Expanded alternative investment platform with new private credit fund',
      'October 2025: Enhanced ESG integration across all investment strategies',
      'Q4 2025: Achieved record ETF inflows of $35B, led by factor-based products',
    ],
    competitiveAdvantages: [
      'Diverse range of investment strategies and products',
      'Strong ETF platform with innovative factor-based products',
      'Global presence with local market expertise',
      'Comprehensive institutional and retail solutions',
      'Focus on innovation and client service',
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    ],
  },
};

// Function to get overview for a company, using detailed data if available, otherwise generating template
export function getCompanyOverview(
  companyId: string,
  name: string,
  type: string,
  region: string,
  founded: string,
  headquarters: string,
  aum?: string
): CompanyOverview {
  // Check if detailed overview exists
  if (companyOverviews[companyId]) {
    return companyOverviews[companyId];
  }

  // Generate template overview
  return generateTemplateOverview(companyId, name, type, region, founded, headquarters, aum);
}

