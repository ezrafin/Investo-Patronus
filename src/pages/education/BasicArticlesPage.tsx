import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Getting Started', count: 12 },
  { name: 'Stock Basics', count: 18 },
  { name: 'Investment Terms', count: 24 },
  { name: 'Risk Management', count: 8 },
  { name: 'Portfolio Basics', count: 10 },
];

const articles = [
  {
    title: 'What is the Stock Market?',
    description: 'A comprehensive introduction to how stock markets work and why they matter for investors.',
    readTime: '8 min read',
    category: 'Getting Started',
  },
  {
    title: 'Understanding Stocks vs Bonds',
    description: 'Learn the key differences between stocks and bonds and how to use both in your portfolio.',
    readTime: '10 min read',
    category: 'Investment Terms',
  },
  {
    title: 'How to Read a Stock Quote',
    description: 'Decode stock quotes and understand what all those numbers mean for your investments.',
    readTime: '6 min read',
    category: 'Stock Basics',
  },
  {
    title: 'Introduction to Market Indices',
    description: 'Understand what S&P 500, Dow Jones, and other indices mean for the market.',
    readTime: '7 min read',
    category: 'Stock Basics',
  },
  {
    title: 'What is Diversification?',
    description: 'Learn why spreading your investments across different assets is crucial for managing risk.',
    readTime: '9 min read',
    category: 'Risk Management',
  },
  {
    title: 'Understanding P/E Ratio',
    description: 'A beginner-friendly guide to one of the most common stock valuation metrics.',
    readTime: '8 min read',
    category: 'Investment Terms',
  },
  {
    title: 'Types of Investment Accounts',
    description: 'Compare brokerage accounts, IRAs, and 401(k)s to choose the right one for you.',
    readTime: '12 min read',
    category: 'Getting Started',
  },
  {
    title: 'How Dividends Work',
    description: 'Everything you need to know about dividend payments and dividend investing.',
    readTime: '10 min read',
    category: 'Stock Basics',
  },
  {
    title: 'Bull vs Bear Markets Explained',
    description: 'Understand market cycles and how to navigate both up and down markets.',
    readTime: '7 min read',
    category: 'Investment Terms',
  },
];

export default function BasicArticlesPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Education</span>
            <h1 className="heading-xl mb-6">Basic Articles</h1>
            <p className="body-xl">
              Start your investment journey with our beginner-friendly guides and tutorials.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button className="flex items-center justify-between w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <span>{category.name}</span>
                        <span className="bg-secondary px-2 py-0.5 rounded-full text-xs">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <article key={article.title} className="glass-card-hover p-6 group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-secondary">{article.category}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="heading-xs mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="body-sm mb-4">{article.description}</p>
                    <Link to="#" className="inline-flex items-center text-sm text-primary hover:underline">
                      Read Article <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="heading-sm mb-4">Ready for More Advanced Content?</h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              Once you have mastered the basics, explore our advanced articles for deeper insights.
            </p>
            <Link to="/education/advanced" className="btn-primary">
              View Advanced Articles
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
