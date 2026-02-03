import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { NewsCard } from '@/components/NewsCard';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { fetchNews, NewsItem } from '@/lib/api/index';
import { ArrowRight, Newspaper } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const NewsSection = memo(function NewsSection() {
  const { t } = useTranslation({ namespace: 'ui' });
  
  // Use React Query for caching and automatic refetching
  const { data: news = [], isLoading } = useQuery<NewsItem[]>({
    queryKey: ['news', 'homepage'],
    queryFn: () => fetchNews(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes cache
  });

  return (
    <section className="section-spacing">
      <div className="container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="badge-outline mb-4"><Newspaper className="h-3 w-3 mr-1" />{t('homeNewsSection.badge')}</span>
            <h2 className="heading-md">{t('homeNewsSection.title')}</h2>
          </div>
          <Link to="/news" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          {t('homeNewsSection.viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} lines={3} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item, index) => (
              <NewsCard key={item.id} news={item} featured={true} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});