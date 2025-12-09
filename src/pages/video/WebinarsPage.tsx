import { Layout } from '@/components/layout/Layout';
import { Video, Calendar, Clock, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const upcomingWebinars = [
  {
    title: '2025 Market Outlook: What Every Investor Should Know',
    date: 'January 15, 2025',
    time: '2:00 PM EST',
    duration: '90 min',
    speaker: 'Michael Chen, Senior Market Analyst',
    description: 'Get actionable insights on market trends and investment opportunities for the year ahead.',
    registered: 1250,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
  },
  {
    title: 'Technical Analysis Masterclass',
    date: 'January 22, 2025',
    time: '11:00 AM EST',
    duration: '120 min',
    speaker: 'Sarah Johnson, Technical Analyst',
    description: 'Learn to read charts and identify trading patterns like a professional.',
    registered: 890,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
  },
];

const recordedWebinars = [
  {
    title: 'Q4 2024 Earnings Preview',
    date: 'December 1, 2024',
    duration: '75 min',
    views: 3420,
  },
  {
    title: 'Cryptocurrency Portfolio Strategies',
    date: 'November 20, 2024',
    duration: '90 min',
    views: 2890,
  },
  {
    title: 'Dividend Investing Workshop',
    date: 'November 10, 2024',
    duration: '85 min',
    views: 4150,
  },
  {
    title: 'Options Trading for Beginners',
    date: 'October 28, 2024',
    duration: '100 min',
    views: 5670,
  },
  {
    title: 'Real Estate Investment Trusts (REITs)',
    date: 'October 15, 2024',
    duration: '70 min',
    views: 2340,
  },
  {
    title: 'Building a Retirement Portfolio',
    date: 'October 5, 2024',
    duration: '80 min',
    views: 4890,
  },
];

export default function WebinarsPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">Webinars</span>
            <h1 className="heading-xl mb-6">Live & On-Demand Webinars</h1>
            <p className="body-xl">
              Join our expert-led webinars to deepen your investing knowledge and skills.
            </p>
          </div>

          {/* Upcoming Webinars */}
          <div className="mb-16">
            <h2 className="heading-md mb-6">Upcoming Live Sessions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingWebinars.map((webinar) => (
                <div key={webinar.title} className="glass-card overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={webinar.image}
                      alt={webinar.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span className="absolute bottom-4 left-4 badge-primary">Live</span>
                  </div>
                  <div className="p-6">
                    <h3 className="heading-xs mb-2">{webinar.title}</h3>
                    <p className="body-sm mb-4">{webinar.description}</p>
                    <p className="text-sm mb-4">
                      <span className="text-muted-foreground">Presenter:</span>{' '}
                      <span className="font-medium">{webinar.speaker}</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {webinar.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {webinar.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {webinar.registered} registered
                      </span>
                    </div>
                    <Button className="w-full">Register Free</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recorded Webinars */}
          <div>
            <h2 className="heading-md mb-6">On-Demand Library</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordedWebinars.map((webinar) => (
                <div key={webinar.title} className="glass-card-hover p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{webinar.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span>{webinar.date}</span>
                    <span>•</span>
                    <span>{webinar.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{webinar.views.toLocaleString()} views</span>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Watch
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 glass-card p-8 text-center">
            <h2 className="heading-sm mb-4">Want to Host a Webinar?</h2>
            <p className="body-md mb-6 max-w-xl mx-auto">
              If you are an industry expert interested in presenting to our audience, we would love to hear from you.
            </p>
            <Button variant="outline">Apply to Present</Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
