import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/date';
import { Badge } from '@/components/ui/badge';

export function MyDiscussions() {
  const { user } = useUser();
  const { t, language } = useTranslation({ namespace: 'ui' });

  const { data: discussions, isLoading } = useQuery({
    queryKey: ['my-discussions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('forum_discussions')
        .select('id, title, created_at, is_featured, reply_count, view_count, category')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
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

  if (!discussions?.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-40" />
        <p>{t('profilePage.noDiscussions')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {discussions.map((d) => (
        <Link
          key={d.id}
          to={d.is_featured ? `/forum/${d.id}` : '#'}
          className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm truncate">{d.title}</h4>
              {d.is_featured ? (
                <Badge variant="outline" className="text-[10px] border-green-500/50 text-green-600 dark:text-green-400 flex-shrink-0">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {t('profilePage.statusApproved')}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] border-yellow-500/50 text-yellow-600 dark:text-yellow-400 flex-shrink-0">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {t('profilePage.statusPending')}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatRelativeTime(new Date(d.created_at), language)}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {d.reply_count}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
