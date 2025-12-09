import { Layout } from '@/components/layout/Layout';
import { Play, Clock, Calendar, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredEpisode = {
  title: 'The Future of AI in Finance',
  description: 'We explore how artificial intelligence is reshaping investment strategies and what it means for individual investors.',
  duration: '45 min',
  date: 'December 5, 2024',
  guest: 'Dr. Emily Chen, AI Research Director at Goldman Sachs',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
};

const episodes = [
  {
    title: 'Understanding the 2024 Bull Market',
    duration: '38 min',
    date: 'November 28, 2024',
    guest: 'Mark Thompson, Chief Strategist',
  },
  {
    title: 'Crypto Regulation: What to Expect in 2025',
    duration: '42 min',
    date: 'November 21, 2024',
    guest: 'Sarah Williams, Blockchain Attorney',
  },
  {
    title: 'Value Investing in a Growth Market',
    duration: '35 min',
    date: 'November 14, 2024',
    guest: 'James Chen, Value Fund Manager',
  },
  {
    title: 'The Rise of Retail Investors',
    duration: '40 min',
    date: 'November 7, 2024',
    guest: 'Lisa Rodriguez, Market Analyst',
  },
  {
    title: 'Global Markets: Asia Pacific Focus',
    duration: '48 min',
    date: 'October 31, 2024',
    guest: 'David Kim, APAC Strategist',
  },
  {
    title: 'ESG Investing: Beyond the Hype',
    duration: '36 min',
    date: 'October 24, 2024',
    guest: 'Emma Green, Sustainability Expert',
  },
];

export default function PodcastsPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Podcasts</span>
            <h1 className="heading-xl mb-6">Market Insights Podcast</h1>
            <p className="body-xl">
              Weekly conversations with industry experts on markets, investing, and financial strategy.
            </p>
          </div>

          {/* Featured Episode */}
          <div className="glass-card overflow-hidden mb-12">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={featuredEpisode.image}
                  alt={featuredEpisode.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="badge-primary mb-4 w-fit">Latest Episode</span>
                <h2 className="heading-md mb-4">{featuredEpisode.title}</h2>
                <p className="body-md mb-4">{featuredEpisode.description}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  <span className="font-medium">Guest:</span> {featuredEpisode.guest}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredEpisode.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredEpisode.date}
                  </span>
                </div>
                <Button size="lg" className="w-fit">
                  <Play className="h-4 w-4 mr-2" />
                  Listen Now
                </Button>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div>
            <h2 className="heading-md mb-6">All Episodes</h2>
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div key={episode.title} className="glass-card-hover p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Headphones className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{episode.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Guest: {episode.guest}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {episode.duration}
                          </span>
                          <span>{episode.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <h2 className="heading-sm mb-4">Never Miss an Episode</h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              Subscribe to our podcast on your favorite platform and get notified when new episodes are released.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline">Apple Podcasts</Button>
              <Button variant="outline">Spotify</Button>
              <Button variant="outline">Google Podcasts</Button>
              <Button variant="outline">RSS Feed</Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
