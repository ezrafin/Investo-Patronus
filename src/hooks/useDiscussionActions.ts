import { useCallback, useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

export function useDiscussionActions(topicId?: string) {
  const { user } = useUser();
  const { t } = useTranslation({ namespace: 'ui' });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    if (!user || !topicId) return;

    const loadStatuses = async () => {
      const [{ data: bookmark }, { data: follow }] = await Promise.all([
        supabase
          .from('user_bookmarks')
          .select('id')
          .eq('user_id', user.id)
          .eq('content_type', 'discussion')
          .eq('content_id', topicId)
          .maybeSingle(),
        (supabase as any)
          .from('forum_follows')
          .select('id')
          .eq('user_id', user.id)
          .eq('discussion_id', topicId)
          .maybeSingle(),
      ]);

      setIsBookmarked(!!bookmark);
      setIsFollowing(!!follow);
    };

    loadStatuses();
  }, [user, topicId]);

  const toggleBookmark = useCallback(async () => {
    if (!user || !topicId) {
      toast.error(t('toast.pleaseSignInToBookmarkDiscussions'));
      return;
    }

    setBookmarkLoading(true);
    const next = !isBookmarked;
    setIsBookmarked(next);

    try {
      if (next) {
        await supabase.from('user_bookmarks').insert({
          user_id: user.id,
          content_type: 'discussion',
          content_id: topicId,
        });
        toast.success(t('toast.addedToBookmarks'));
      } else {
        await supabase
          .from('user_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('content_type', 'discussion')
          .eq('content_id', topicId);
        toast.success(t('toast.removedFromBookmarks'));
      }
    } catch (error: any) {
      setIsBookmarked(!next);
      toast.error(error.message || t('toast.failedToUpdateBookmark'));
    } finally {
      setBookmarkLoading(false);
    }
  }, [user, topicId, isBookmarked, t]);

  const toggleFollow = useCallback(async () => {
    if (!user || !topicId) {
      toast.error(t('toast.pleaseSignInToFollowDiscussions'));
      return;
    }

    setFollowLoading(true);
    const next = !isFollowing;
    setIsFollowing(next);

    try {
      if (next) {
        await (supabase as any).from('forum_follows').insert({
          user_id: user.id,
          discussion_id: topicId,
        });
        toast.success(t('toast.followingDiscussion'));
      } else {
        await (supabase as any)
          .from('forum_follows')
          .delete()
          .eq('user_id', user.id)
          .eq('discussion_id', topicId);
        toast.success(t('toast.unfollowedDiscussion'));
      }
    } catch (error: any) {
      setIsFollowing(!next);
      toast.error(error.message || t('errors.failedToUpdate'));
    } finally {
      setFollowLoading(false);
    }
  }, [user, topicId, isFollowing, t]);

  return {
    isBookmarked,
    isFollowing,
    bookmarkLoading,
    followLoading,
    toggleBookmark,
    toggleFollow,
  };
}


