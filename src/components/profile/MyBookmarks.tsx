import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { Bookmark, Clock } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/date';

export function MyBookmarks() {
  const { user } = useUser();
  const { t, language } = useTranslation({ namespace: 'ui' });

  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ['my-bookmarks-profile', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_bookmarks')
        .select('id, content_id, content_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!bookmarks?.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-40" />
        <p>{t('profilePage.noBookmarks')}</p>
      </div>
    );
  }

  const getBookmarkLink = (b: { content_type: string; content_id: string }) => {
    switch (b.content_type) {
      case 'discussion': return `/forum/${b.content_id}`;
      case 'news': return `/news/${b.content_id}`;
      case 'analytics': return `/analytics/${b.content_id}`;
      default: return '#';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'discussion': return t('profilePage.bookmarkTypeForum');
      case 'news': return t('profilePage.bookmarkTypeNews');
      case 'analytics': return t('profilePage.bookmarkTypeAnalytics');
      default: return type;
    }
  };

  return (
    <div className="space-y-3">
      {bookmarks.map((b) => (
        <Link
          key={b.id}
          to={getBookmarkLink(b)}
          className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
        >
          <Bookmark className="h-4 w-4 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{b.content_id}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="capitalize">{getTypeLabel(b.content_type)}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatRelativeTime(new Date(b.created_at!), language)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
