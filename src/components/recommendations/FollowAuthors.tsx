import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { UserPlus, UserCheck, TrendingUp, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/user/UserAvatar';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { useUserFollow } from '@/hooks/useUserFollow';

interface Author {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  reputation: number;
  post_count: number;
  comment_count: number;
  is_following: boolean;
}

export function FollowAuthors({ className, limit = 5 }: { className?: string; limit?: number }) {
  const { user } = useUser();
  const { t } = useTranslation({ namespace: 'ui' });
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthors = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get top users by reputation_score or posts_count
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, username, display_name, avatar_url, bio, reputation_score, posts_count')
          .neq('id', user.id) // Exclude current user
          .not('reputation_score', 'is', null)
          .order('reputation_score', { ascending: false })
          .limit(limit * 2); // Get more to filter out already following

        if (profilesError) throw profilesError;

        // Get list of users current user is following
        const { data: following, error: followingError } = await supabase
          .from('user_follows' as any)
          .select('following_id')
          .eq('follower_id', user.id);

        if (followingError) throw followingError;

        const followingIds = new Set((following || []).map((f: any) => f.following_id));

        // Map profiles to authors and filter
        const mappedAuthors: Author[] = (profiles || [])
          .map((profile: any) => ({
            id: profile.id,
            username: profile.username,
            display_name: profile.display_name,
            avatar_url: profile.avatar_url,
            bio: profile.bio,
            reputation: profile.reputation_score || 0,
            post_count: profile.posts_count || 0,
            comment_count: 0, // Not available in profiles table
            is_following: followingIds.has(profile.id),
          }))
          .slice(0, limit); // Take only the requested limit

        setAuthors(mappedAuthors);
      } catch (error) {
        console.error('Error loading authors:', error);
        toast.error(t('errors.failedToLoad', 'Failed to load authors'));
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, [user, limit, t]);

  if (!user) {
    return (
      <div className={cn('premium-card p-6 text-center', className)}>
        <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground mb-2">{t('followAuthors.signInToFollow')}</p>
        <Link to="/auth/login" className="text-primary hover:underline text-sm">
          {t('buttons.signIn')}
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">{t('followAuthors.title')}</h3>
        </div>
        {Array.from({ length: Math.min(limit, 3) }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))}
      </div>
    );
  }

  if (authors.length === 0) {
    return (
      <div className={cn('premium-card p-6 text-center', className)}>
        <p className="text-muted-foreground">{t('followAuthors.noAuthorsFound')}</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">{t('followAuthors.title')}</h3>
      </div>

      <div className="space-y-3">
        {authors.map((author) => {
          const profile = {
            id: author.id,
            username: author.username,
            display_name: author.display_name,
            avatar_url: author.avatar_url,
            reputation: author.reputation,
            post_count: author.post_count,
            comment_count: author.comment_count,
            bio: author.bio,
            privacy_level: 'public' as const,
          };

          return (
            <AuthorFollowItem
              key={author.id}
              author={author}
              profile={profile}
              onFollowChange={(isFollowing) => {
                setAuthors((prev) =>
                  prev.map((a) =>
                    a.id === author.id ? { ...a, is_following: isFollowing } : a
                  )
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function AuthorFollowItem({
  author,
  profile,
  onFollowChange,
}: {
  author: Author;
  profile: any;
  onFollowChange: (isFollowing: boolean) => void;
}) {
  const { t } = useTranslation({ namespace: 'ui' });
  const { isFollowing, loading, toggleFollow } = useUserFollow(author.id);

  const handleToggle = async () => {
    const previousState = isFollowing;
    onFollowChange(!previousState); // Optimistic update
    try {
      await toggleFollow();
    } catch (error) {
      // Revert on error
      onFollowChange(previousState);
    }
  };

  return (
    <div className="p-3 rounded-lg border border-border/50 hover:bg-secondary/50 transition-all">
      <div className="flex items-center gap-3">
        <Link to={`/users/${author.id}`} className="flex-shrink-0">
          <UserAvatar profile={profile} size="md" showReputation />
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/users/${author.id}`} className="block">
            <h4 className="font-medium text-sm hover:text-primary transition-colors">
              {author.display_name || author.username || t('common.anonymous')}
            </h4>
          </Link>
          {author.bio && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {author.bio}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {author.post_count}
            </span>
          </div>
        </div>
        <Button
          variant={isFollowing ? 'outline' : 'default'}
          size="sm"
          onClick={handleToggle}
          disabled={loading}
          className="flex-shrink-0 self-center"
        >
          {isFollowing ? (
            <>
              <UserCheck className="h-3 w-3 mr-1" />
              {t('followAuthors.following')}
            </>
          ) : (
            <>
              <UserPlus className="h-3 w-3 mr-1" />
              {t('followAuthors.follow')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
