import { UserProfile } from '@/hooks/useAuth';
import { Award, Star, TrendingUp, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface ReputationBadgeProps {
  profile: UserProfile | null;
  size?: 'sm' | 'md' | 'lg';
  showLevel?: boolean;
  className?: string;
}

const reputationLevels = [
  { min: 0, key: 'newbie', icon: null, color: 'text-muted-foreground', bgColor: 'bg-muted' },
  { min: 10, key: 'member', icon: TrendingUp, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { min: 50, key: 'active', icon: TrendingUp, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { min: 100, key: 'expert', icon: Award, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  { min: 500, key: 'guru', icon: Star, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  { min: 1000, key: 'legend', icon: Crown, color: 'text-amber-600', bgColor: 'bg-amber-600/10' },
];

function getReputationLevel(reputation: number) {
  return reputationLevels.reduce((acc, level) => 
    reputation >= level.min ? level : acc, 
    reputationLevels[0]
  );
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

const iconSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function ReputationBadge({ profile, size = 'md', showLevel = true, className }: ReputationBadgeProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  if (!profile) return null;

  const reputation = profile.reputation || 0;
  const level = getReputationLevel(reputation);
  const Icon = level.icon;
  const levelName = t(`profilePage.reputationLevels.${level.key}`);

  return (
    <div className={cn('inline-flex items-center gap-1.5 rounded-full font-medium', sizeClasses[size], level.bgColor, level.color, className)}>
      {Icon && <Icon className={iconSizes[size]} />}
      {showLevel && <span>{levelName}</span>}
      <span className="tabular-nums opacity-75">({reputation})</span>
    </div>
  );
}

