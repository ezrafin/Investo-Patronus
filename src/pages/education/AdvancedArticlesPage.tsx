import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Award, Clock, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Technical Analysis', count: 15 },
  { name: 'Options Trading', count: 12 },
  { name: 'Quantitative Strategies', count: 8 },
  { name: 'Risk Management', count: 10 },
  { name: 'Portfolio Theory', count: 14 },
];

const articles = [
  {
    title: 'Advanced Candlestick Patterns',
    description: 'Master complex candlestick formations and improve your technical analysis skills.',
    readTime: '15 min read',
    category: 'Technical Analysis',
    difficulty: 'Advanced',
  },
  {
    title: 'The Black-Scholes Model Explained',
    description: 'Understanding the mathematical foundation of options pricing and its applications.',
    readTime: '20 min read',
    category: 'Options Trading',
    difficulty: 'Expert',
  },
  {
    title: 'Factor Investing Strategies',
    description: 'Learn to build portfolios based on factors like value, momentum, and quality.',
    readTime: '18 min read',
    category: 'Quantitative Strategies',
    difficulty: 'Advanced',
  },
  {
    title: 'Value at Risk (VaR) Calculations',
    description: 'Quantify potential portfolio losses using statistical risk measurement techniques.',
    readTime: '16 min read',
    category: 'Risk Management',
    difficulty: 'Expert',
  },
  {
    title: 'Modern Portfolio Theory Deep Dive',
    description: 'Explore the mathematics behind efficient frontier and optimal portfolio construction.',
    readTime: '22 min read',
    category: 'Portfolio Theory',
    difficulty: 'Advanced',
  },
  {
    title: 'Iron Condor and Advanced Spreads',
    description: 'Multi-leg options strategies for generating income in sideways markets.',
    readTime: '14 min read',
    category: 'Options Trading',
    difficulty: 'Advanced',
  },
  {
    title: 'Elliott Wave Theory',
    description: 'Analyze market cycles and predict price movements using wave patterns.',
    readTime: '17 min read',
    category: 'Technical Analysis',
    difficulty: 'Advanced',
  },
  {
    title: 'Monte Carlo Simulations in Finance',
    description: 'Apply probability modeling to forecast portfolio performance and assess risk.',
    readTime: '19 min read',
    category: 'Quantitative Strategies',
    difficulty: 'Expert',
  },
  {
    title: 'Hedging Strategies for Portfolio Protection',
    description: 'Advanced techniques to protect your portfolio during market downturns.',
    readTime: '13 min read',
    category: 'Risk Management',
    difficulty: 'Advanced',
  },
];

export default function AdvancedArticlesPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Education</span>
            <h1 className="heading-xl mb-6">Advanced Articles</h1>
            <p className="body-xl">
              In-depth analysis and sophisticated strategies for experienced investors.
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

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium mb-3">Difficulty Levels</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">Advanced</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-muted-foreground">Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <article key={article.title} className="glass-card-hover p-6 group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="badge-secondary">{article.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        article.difficulty === 'Expert' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {article.difficulty}
                      </span>
                    </div>
                    <h3 className="heading-xs mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="body-sm mb-4">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <Link to="#" className="inline-flex items-center text-sm text-primary hover:underline">
                        Read <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="heading-sm mb-4">Take Your Skills to the Next Level</h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              Enroll in our structured learning course for a comprehensive investment education.
            </p>
            <Link to="/education/course" className="btn-primary">
              Explore Learning Course
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
