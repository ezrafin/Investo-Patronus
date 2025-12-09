import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchNewsById, NewsItem } from '@/lib/api';
import { Calendar, ExternalLink, ArrowLeft } from 'lucide-react';

const marketLabels: Record<string, string> = {
  indices: 'Indices',
  stocks: 'Stocks',
  crypto: 'Crypto',
  commodities: 'Commodities',
  currencies: 'Currencies',
  general: 'General',
};

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      if (id) {
        const data = await fetchNewsById(id);
        setNews(data);
        setLoading(false);
      }
    }

    loadNews();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container-narrow section-spacing">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/4 bg-muted rounded" />
            <div className="h-12 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
            <div className="space-y-3 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!news) {
    return (
      <Layout>
        <div className="container-narrow section-spacing text-center">
          <h1 className="heading-lg mb-4">News not found</h1>
          <Link to="/news" className="text-primary hover:underline">
            Return to news
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="section-spacing">
        <div className="container-narrow">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to news
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-sm font-medium rounded bg-secondary text-secondary-foreground">
              {marketLabels[news.market]}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(news.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="heading-lg mb-6">{news.title}</h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <ExternalLink className="h-4 w-4" />
            Source: {news.source}
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">{news.excerpt}</p>
            <p className="text-foreground leading-relaxed">{news.content}</p>
          </div>
        </div>
      </article>
    </Layout>
  );
}