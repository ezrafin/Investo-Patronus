import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { fetchForumCategories, fetchForumTopics, ForumCategory, ForumTopic } from '@/lib/api';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { MessageSquare, Users, Clock, Eye, MessageCircle, TrendingUp, Flame, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ForumPage() {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [recentTopics, setRecentTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [categoriesData, topicsData] = await Promise.all([
        fetchForumCategories(),
        fetchForumTopics(),
      ]);
      setCategories(categoriesData);
      setRecentTopics(topicsData);
      setLoading(false);
    }

    loadData();
  }, []);

  const categoryIcons: Record<string, typeof MessageSquare> = {
    investments: TrendingUp,
    companies: MessageSquare,
    markets: Flame,
    crypto: MessageCircle,
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-wide py-16 md:py-24">
          <span className="badge-outline mb-4">Community</span>
          <h1 className="heading-lg mb-4">Forum</h1>
          <p className="body-lg max-w-2xl">
            Discuss investment strategies, share experiences, and analyze markets with the community
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="section-spacing-sm">
        <div className="container-wide">
          <h2 className="heading-sm mb-8">Categories</h2>
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} lines={3} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {categories.map((category, index) => {
                const Icon = categoryIcons[category.id] || MessageSquare;
                return (
                  <Link
                    key={category.id}
                    to={`/forum?category=${category.id}`}
                    className="group p-6 md:p-8 rounded-xl border border-border/60 bg-card hover:border-border hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-heading font-medium text-lg group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <MessageCircle className="h-3.5 w-3.5" />
                            {category.topicCount.toLocaleString()} topics
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            {category.postCount.toLocaleString()} posts
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Recent Topics */}
      <section className="section-spacing-sm bg-secondary/30">
        <div className="container-wide">
          <h2 className="heading-sm mb-8">Recent Discussions</h2>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} lines={2} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              {recentTopics.map((topic, index) => (
                <Link
                  key={topic.id}
                  to={`/forum/${topic.id}`}
                  className={cn(
                    'flex items-center gap-4 p-4 md:p-6 hover:bg-secondary/50 transition-colors',
                    index !== recentTopics.length - 1 && 'border-b border-border/60'
                  )}
                >
                  {/* Avatar with level indicator */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={topic.authorAvatar}
                      alt={topic.author}
                      className="w-12 h-12 rounded-full bg-muted ring-2 ring-background"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center ring-2 ring-background">
                      {Math.floor(Math.random() * 10) + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-base md:text-lg truncate hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-muted-foreground mt-1.5">
                      <span className="font-medium text-foreground/80">{topic.author}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{new Date(topic.date).toLocaleDateString('en-US')}</span>
                      <span className="badge-secondary text-[10px] px-2 py-0.5">
                        {topic.categoryId === 'crypto' ? 'Crypto' : 
                         topic.categoryId === 'investments' ? 'Investments' :
                         topic.categoryId === 'companies' ? 'Companies' : 'Markets'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
                    <div className="flex items-center gap-1.5 min-w-[60px]">
                      <MessageCircle className="h-4 w-4" />
                      <span className="tabular-nums">{topic.replies}</span>
                    </div>
                    <div className="flex items-center gap-1.5 min-w-[60px]">
                      <Eye className="h-4 w-4" />
                      <span className="tabular-nums">{topic.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 min-w-[100px] text-xs">
                      <Clock className="h-3.5 w-3.5" />
                      {topic.lastActivity}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}