import { Pin, Star, Flame, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface TopicStatusBadgeProps {
  isPinned?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  isTrending?: boolean;
  className?: string;
}

export function TopicStatusBadge({
  isPinned,
  isFeatured,
  isNew,
  isHot,
  isTrending,
  className,
}: TopicStatusBadgeProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  const badges: Array<{ label: string; icon: typeof Pin; className: string }> = [];

  if (isPinned) {
    badges.push({
      label: t('topicStatus.pinned'),
      icon: Pin,
      className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    });
  }

  if (isFeatured) {
    badges.push({
      label: t('topicStatus.featured'),
      icon: Star,
      className: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    });
  }

  if (isTrending) {
    badges.push({
      label: t('topicStatus.trending'),
      icon: Sparkles,
      className: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    });
  }

  if (isHot) {
    badges.push({
      label: t('topicStatus.hot'),
      icon: Flame,
      className: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    });
  }

  if (isNew) {
    badges.push({
      label: t('topicStatus.new'),
      icon: Sparkles,
      className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    });
  }

  if (badges.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-1.5 flex-wrap', className)}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <span
            key={index}
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
              badge.className
            )}
          >
            <Icon className="h-3 w-3" />
            <span>{badge.label}</span>
          </span>
        );
      })}
    </div>
  );
}

