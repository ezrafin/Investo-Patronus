export const articleTopics = {
  markets: {
    name: 'Markets',
    subtopics: ['Stock Market', 'Cryptocurrencies', 'Commodities', 'Currencies', 'Real Estate']
  },
  strategies: {
    name: 'Strategies',
    subtopics: ['Long-term Investing', 'Trading', 'Passive Income', 'Hedging', 'Dividend Strategy']
  },
  analysis: {
    name: 'Analysis',
    subtopics: ['Technical Analysis', 'Fundamental Analysis', 'Quantitative Analysis', 'Macroeconomic Analysis']
  },
  education: {
    name: 'Education',
    subtopics: ['For Beginners', 'Advanced Level', 'Investment Psychology', 'Financial Literacy']
  },
  instruments: {
    name: 'Instruments',
    subtopics: ['ETF', 'Stocks', 'Bonds', 'Options', 'Derivatives']
  },
  comparison: {
    name: 'Comparisons',
    subtopics: ['Deposits vs Investments', 'Active vs Passive Management', 'Brokers', 'Investment Platforms']
  }
};

export const articleFormats = [
  { id: 'guide', name: 'Guide', description: 'Step-by-step guide' },
  { id: 'case_study', name: 'Case Study', description: 'Analysis of a specific situation' },
  { id: 'comparison', name: 'Comparison', description: 'Comparative analysis of options' },
  { id: 'checklist', name: 'Checklist', description: 'List for verification' }
];

export interface ArticleApplication {
  id?: string;
  email: string;
  topic: string;
  subtopic: string;
  proposedTitle: string;
  detailedDescription: string;
  format: 'guide' | 'case_study' | 'comparison' | 'checklist';
  sourceData: string;
  thesisList: string[];
  references?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  createdAt?: string;
  submittedAt?: string;
}
