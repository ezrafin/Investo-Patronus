import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';

const authors = [
  {
    name: 'Michael Chen',
    role: 'Senior Market Analyst',
    bio: 'Michael has over 15 years of experience in equity research and portfolio management. He specializes in technology and growth stocks.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    articles: 156,
  },
  {
    name: 'Sarah Johnson',
    role: 'Cryptocurrency Expert',
    bio: 'Sarah is a blockchain researcher and cryptocurrency analyst who has been covering digital assets since 2015.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    articles: 89,
  },
  {
    name: 'David Williams',
    role: 'Commodities Analyst',
    bio: 'David specializes in precious metals and energy markets with a background in commodity trading.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    articles: 112,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Fixed Income Specialist',
    bio: 'Emily covers bond markets and interest rate dynamics, helping investors navigate the fixed income landscape.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    articles: 78,
  },
  {
    name: 'James Thompson',
    role: 'Forex Analyst',
    bio: 'James has been analyzing currency markets for over a decade, focusing on major and emerging market pairs.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    articles: 134,
  },
  {
    name: 'Lisa Park',
    role: 'ETF Strategist',
    bio: 'Lisa helps investors build diversified portfolios using ETFs, with expertise in factor investing.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    articles: 67,
  },
];

export default function AuthorsPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Authors</span>
            <h1 className="heading-xl mb-6">Meet Our Experts</h1>
            <p className="body-xl">
              Our team of experienced analysts and writers bring you the insights you need to make informed investment decisions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <div key={author.name} className="glass-card-hover p-6 text-center">
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-border"
                />
                <h3 className="heading-xs mb-1">{author.name}</h3>
                <p className="text-sm text-primary mb-3">{author.role}</p>
                <p className="body-sm mb-4">{author.bio}</p>
                <div className="text-sm text-muted-foreground">
                  {author.articles} articles published
                </div>
              </div>
            ))}
          </div>

          {/* Become an Author */}
          <div className="mt-16 glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">Want to Contribute?</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">
              We are always looking for knowledgeable writers to join our team. Share your expertise with our audience.
            </p>
            <Link to="/contact" className="btn-primary">
              Apply to Write
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
