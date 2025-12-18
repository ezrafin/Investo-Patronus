import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { authors } from '@/data/authors';
import { useTranslation } from '@/hooks/useTranslation';

export default function AuthorsPage() {
  const { t } = useTranslation({ namespace: 'ui' });

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-wide section-spacing-sm">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="badge-primary mb-4">{t('authorsPage.badge')}</span>
            <h1 className="heading-xl mb-6">{t('authorsPage.heroTitle')}</h1>
            <p className="body-xl">
              {t('authorsPage.heroSubtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <div key={author.id} className="glass-card-hover p-6 text-center">
                <img
                  src={author.avatar_url ?? undefined}
                  alt={author.display_name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-border"
                />
                <h3 className="heading-xs mb-1">{author.display_name}</h3>
                <p className="text-sm text-primary mb-3">{author.bio}</p>
                <div className="text-sm text-muted-foreground">
                  {t('authorsPage.publishedCount', { count: author.post_count })}
                </div>
              </div>
            ))}
          </div>

          {/* Become an Author */}
          <div className="mt-16 glass-card p-8 lg:p-12 text-center">
            <h2 className="heading-md mb-4">{t('authorsPage.ctaTitle')}</h2>
            <p className="body-lg mb-6 max-w-2xl mx-auto">
              {t('authorsPage.ctaSubtitle')}
            </p>
            <Link to="/contact" className="btn-primary">
              {t('authorsPage.ctaButton')}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
