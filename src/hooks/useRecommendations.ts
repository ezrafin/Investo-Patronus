import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';

export interface Recommendation {
  type: 'article' | 'forum' | 'video' | 'analytics' | 'news';
  id: string;
  title: string;
  reason: string;
  score: number;
}

export function useRecommendations() {
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRecommendations([]);
      setLoading(false);
      return;
    }

    loadRecommendations();
  }, [user]);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      // Get trending forum discussions as recommendations
      const { data: forumData } = await supabase
        .from('forum_discussions')
        .select('id, title, view_count')
        .order('view_count', { ascending: false })
        .limit(3);

      // Get recent news as recommendations
      const { data: newsData } = await supabase
        .from('news_articles')
        .select('id, title')
        .order('published_at', { ascending: false })
        .limit(3);

      const recs: Recommendation[] = [];

      if (forumData) {
        forumData.forEach((item, index) => {
          recs.push({
            type: 'forum',
            id: item.id,
            title: item.title,
            reason: 'Trending discussion',
            score: 90 - index * 5,
          });
        });
      }

      if (newsData) {
        newsData.forEach((item, index) => {
          recs.push({
            type: 'news',
            id: item.id,
            title: item.title,
            reason: 'Latest news',
            score: 85 - index * 5,
          });
        });
      }

      // Sort by score
      recs.sort((a, b) => b.score - a.score);
      setRecommendations(recs.slice(0, 6));
    } catch (error) {
      console.error('Error loading recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, loading, refresh: loadRecommendations };
}
