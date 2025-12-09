import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Coins, Bitcoin, DollarSign, LineChart, PieChart, Wallet, Building2, Globe } from 'lucide-react';

const topicCategories = [
  {
    name: 'Markets',
    icon: TrendingUp,
    topics: [
      { name: 'Stock Market', count: 245, href: '/markets/stocks' },
      { name: 'Indices', count: 89, href: '/markets/indices' },
      { name: 'Commodities', count: 156, href: '/markets/commodities' },
      { name: 'Cryptocurrency', count: 312, href: '/markets/crypto' },
      { name: 'Forex', count: 178, href: '/markets/currencies' },
      { name: 'ETFs', count: 134, href: '/markets/currencies' },
    ],
  },
  {
    name: 'Analysis',
    icon: BarChart3,
    topics: [
      { name: 'Technical Analysis', count: 198, href: '/analytics' },
      { name: 'Fundamental Analysis', count: 167, href: '/analytics' },
      { name: 'Sector Analysis', count: 89, href: '/analytics' },
      { name: 'Economic Indicators', count: 76, href: '/analytics' },
    ],
  },
  {
    name: 'Strategies',
    icon: LineChart,
    topics: [
      { name: 'Value Investing', count: 145, href: '/education/advanced' },
      { name: 'Growth Investing', count: 123, href: '/education/advanced' },
      { name: 'Dividend Investing', count: 98, href: '/education/advanced' },
      { name: 'Day Trading', count: 234, href: '/education/advanced' },
      { name: 'Swing Trading', count: 167, href: '/education/advanced' },
    ],
  },
  {
    name: 'Asset Classes',
    icon: PieChart,
    topics: [
      { name: 'Equities', count: 456, href: '/markets/stocks' },
      { name: 'Fixed Income', count: 89, href: '/education/advanced' },
      { name: 'Real Estate', count: 67, href: '/education/advanced' },
      { name: 'Alternatives', count: 45, href: '/education/advanced' },
    ],
  },
  {
    name: 'Personal Finance',
    icon: Wallet,
    topics: [
      { name: 'Retirement Planning', count: 112, href: '/education/basic' },
      { name: 'Tax Strategies', count: 78, href: '/education/advanced' },
      { name: 'Portfolio Management', count: 134, href: '/education/advanced' },
      { name: 'Risk Management', count: 89, href: '/education/advanced' },
    ],
  },
  {
    name: 'Economy',
    icon: Globe,
    topics: [
      { name: 'Federal Reserve', count: 156, href: '/news' },
      { name: 'Inflation', count: 189, href: '/news' },
      { name: 'Employment', count: 78, href: '/news' },
      { name: 'GDP', count: 56, href: '/news' },
      { name: 'Global Markets', count: 234, href: '/news' },
    ],
  },
];

export default function TopicsPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Topics</span>
            <h1 className="heading-xl mb-6">Browse All Topics</h1>
            <p className="body-xl">
              Explore our comprehensive coverage across all areas of finance and investing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topicCategories.map((category) => (
              <div key={category.name} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="heading-xs">{category.name}</h2>
                </div>
                <ul className="space-y-2">
                  {category.topics.map((topic) => (
                    <li key={topic.name}>
                      <Link
                        to={topic.href}
                        className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>{topic.name}</span>
                        <span className="text-xs bg-secondary px-2 py-1 rounded-full">{topic.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
