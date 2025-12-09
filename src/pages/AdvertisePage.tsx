import { Layout } from '@/components/layout/Layout';
import { Target, Users, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '500K+', label: 'Monthly Visitors' },
  { value: '2.5M+', label: 'Page Views' },
  { value: '150K+', label: 'Newsletter Subscribers' },
  { value: '85%', label: 'High-Net-Worth Audience' },
];

const adFormats = [
  {
    icon: Target,
    title: 'Display Advertising',
    description: 'Premium banner placements across our platform with various sizes and formats.',
    price: 'From $15 CPM',
  },
  {
    icon: Users,
    title: 'Sponsored Content',
    description: 'Native articles and research reports that integrate naturally with our content.',
    price: 'From $5,000',
  },
  {
    icon: TrendingUp,
    title: 'Newsletter Sponsorship',
    description: 'Reach our engaged email audience with dedicated or featured placements.',
    price: 'From $2,500',
  },
  {
    icon: Zap,
    title: 'Custom Campaigns',
    description: 'Tailored advertising solutions designed for your specific marketing goals.',
    price: 'Custom Pricing',
  },
];

export default function AdvertisePage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">Advertise</span>
            <h1 className="heading-xl mb-6">Reach Serious Investors</h1>
            <p className="body-xl">
              Connect your brand with our highly engaged audience of investors, traders, and financial professionals.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="container-wide section-spacing-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <div className="heading-lg text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Formats */}
        <section className="section-gradient section-spacing">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Advertising Solutions</h2>
              <p className="body-lg max-w-2xl mx-auto">
                Choose from our range of advertising options to meet your marketing objectives.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {adFormats.map((format) => (
                <div key={format.title} className="glass-card-hover p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <format.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="heading-xs mb-2">{format.title}</h3>
                  <p className="body-sm mb-4">{format.description}</p>
                  <p className="text-sm font-semibold text-primary">{format.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="container-wide section-spacing-sm">
          <div className="glass-card p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="heading-lg mb-4">Our Audience</h2>
                <p className="body-lg mb-6">
                  Our readers are financially sophisticated individuals actively managing their investments.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Average portfolio size: $500K+</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>70% make investment decisions weekly</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>60% are financial professionals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Average session duration: 8 minutes</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="inline-block p-8 rounded-full bg-primary/10">
                  <Users className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-wide">
          <div className="glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">Request a Media Kit</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">
              Download our comprehensive media kit or speak with our advertising team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Download Media Kit
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
