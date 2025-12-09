import { Layout } from '@/components/layout/Layout';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  'Competitive salary and equity',
  'Remote-first culture',
  'Unlimited PTO',
  'Health, dental, and vision insurance',
  'Professional development budget',
  '401(k) matching',
  'Home office stipend',
  'Wellness programs',
];

const openPositions = [
  {
    title: 'Senior Financial Analyst',
    department: 'Research',
    location: 'Remote / New York',
    type: 'Full-time',
    description: 'Join our research team to provide in-depth market analysis and insights.',
  },
  {
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and scale our platform using modern technologies.',
  },
  {
    title: 'Data Scientist',
    department: 'Data',
    location: 'Remote / New York',
    type: 'Full-time',
    description: 'Develop predictive models and analyze market trends.',
  },
  {
    title: 'Content Writer',
    department: 'Content',
    location: 'Remote',
    type: 'Full-time / Part-time',
    description: 'Create engaging financial education content for our audience.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design intuitive user experiences for our investment tools.',
  },
];

export default function CareersPage() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">Careers</span>
            <h1 className="heading-xl mb-6">Join Our Team</h1>
            <p className="body-xl">
              Help us democratize access to professional-grade financial data. We are building the future of investment analytics.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-gradient section-spacing-sm">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Why Work With Us</h2>
              <p className="body-lg max-w-2xl mx-auto">
                We offer competitive benefits and a culture that values work-life balance.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <div key={benefit} className="glass-card p-4 text-center">
                  <p className="text-sm font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="container-wide section-spacing">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Open Positions</h2>
            <p className="body-lg max-w-2xl mx-auto">
              Find your next opportunity and grow with us.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {openPositions.map((position) => (
              <div key={position.title} className="glass-card-hover p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="heading-xs mb-2">{position.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {position.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{position.description}</p>
                  </div>
                  <Button variant="outline" className="flex-shrink-0">
                    Apply <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-wide">
          <div className="glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">Do not see the right role?</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">
              We are always looking for talented people. Send us your resume and we will keep you in mind for future opportunities.
            </p>
            <Button size="lg">
              Send Your Resume
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
