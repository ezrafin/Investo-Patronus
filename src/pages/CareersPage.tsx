import { Layout } from '@/components/layout/Layout';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const positions = [
  {
    title: 'Senior Financial Analyst',
    department: 'Research',
    location: 'Remote / New York',
    type: 'Full-time',
    descriptionKey: 'careersPage.posAnalyst',
  },
  {
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    descriptionKey: 'careersPage.posFullStack',
  },
  {
    title: 'Data Scientist',
    department: 'Data',
    location: 'Remote / New York',
    type: 'Full-time',
    descriptionKey: 'careersPage.posDataSci',
  },
  {
    title: 'Content Writer',
    department: 'Content',
    location: 'Remote',
    type: 'Full-time / Part-time',
    descriptionKey: 'careersPage.posWriter',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    descriptionKey: 'careersPage.posDesigner',
  },
];

export default function CareersPage() {
  const { t } = useTranslation({ namespace: 'ui' });

  const benefits = [
    t('careersPage.benefitCompetitive'),
    t('careersPage.benefitRemote'),
    t('careersPage.benefitPto'),
    t('careersPage.benefitHealth'),
    t('careersPage.benefitLearning'),
    t('careersPage.benefit401k'),
    t('careersPage.benefitHome'),
    t('careersPage.benefitWellness'),
  ];

  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">{t('careersPage.badge')}</span>
            <h1 className="heading-xl mb-6">{t('careersPage.heroTitle')}</h1>
            <p className="body-xl">
              {t('careersPage.heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="container-wide section-spacing-sm">
          <h2 className="heading-lg mb-6">{t('careersPage.benefitsTitle')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="glass-card p-4 text-sm font-medium">
                {benefit}
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="container-wide section-spacing-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-lg">{t('careersPage.positionsTitle')}</h2>
          </div>
          <div className="grid gap-4">
            {positions.map((role) => (
              <div key={role.title} className="glass-card p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="heading-sm">{role.title}</div>
                    <div className="text-sm text-muted-foreground">{role.department}</div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{role.location}</span>
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{role.type}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(role.descriptionKey)}
                </p>
                <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                  <Briefcase className="h-4 w-4" />
                  {t('careersPage.typeLabel')}: {role.type}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container-wide">
          <div className="glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">{t('careersPage.ctaTitle')}</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">{t('careersPage.ctaSubtitle')}</p>
            <Button size="lg">
              {t('careersPage.ctaButton')}
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}