import { Layout } from '@/components/layout/Layout';
import { Handshake, BarChart3, Users, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const partnerTypes = [
  {
    icon: BarChart3,
    title: 'Data Partners',
    description: 'Collaborate with us to integrate your financial data feeds and analytics into our platform.',
    benefits: ['Revenue sharing', 'API integration support', 'Co-marketing opportunities'],
  },
  {
    icon: Users,
    title: 'Affiliate Partners',
    description: 'Earn commissions by referring investors to INVESTOPATRONUS through your network.',
    benefits: ['Competitive commissions', 'Marketing materials', 'Dedicated partner manager'],
  },
  {
    icon: Globe,
    title: 'Technology Partners',
    description: 'Build integrations and apps that enhance our platform for mutual customers.',
    benefits: ['Developer resources', 'Technical support', 'Featured placement'],
  },
  {
    icon: Handshake,
    title: 'Strategic Partners',
    description: 'Form strategic alliances to expand market reach and enhance product offerings.',
    benefits: ['Custom solutions', 'Joint ventures', 'Market expansion'],
  },
];

const currentPartners = [
  'Bloomberg', 'Reuters', 'Refinitiv', 'Morningstar', 'S&P Global', 'Nasdaq',
];

export default function PartnershipsPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">Partnerships</span>
            <h1 className="heading-xl mb-6">Partner With Us</h1>
            <p className="body-xl">
              Join our ecosystem of partners and help investors make better decisions. Together, we can shape the future of financial data.
            </p>
          </div>
        </section>

        {/* Partner Types */}
        <section className="container-wide section-spacing-sm">
          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map((type) => (
              <div key={type.title} className="glass-card-hover p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <type.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="heading-sm mb-3">{type.title}</h3>
                <p className="body-md mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Current Partners */}
        <section className="section-gradient section-spacing">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Trusted By Industry Leaders</h2>
              <p className="body-lg max-w-2xl mx-auto">
                We work with the best names in financial data and technology.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {currentPartners.map((partner) => (
                <div key={partner} className="glass-card px-8 py-4">
                  <span className="text-lg font-semibold text-muted-foreground">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-wide">
          <div className="glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">Ready to Partner?</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">
              Let us discuss how we can work together to create value for investors worldwide.
            </p>
            <Button size="lg">
              Contact Partnership Team <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
