import { useCallback, useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useDiscussionActions(topicId?: string) {
  const { user } = useUser();
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
      toast.error('Please sign in to bookmark discussions');
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
        toast.success('Added to bookmarks');
      } else {
        await supabase
          .from('user_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('content_type', 'discussion')
          .eq('content_id', topicId);
        toast.success('Removed from bookmarks');
      }
    } catch (error: any) {
      setIsBookmarked(!next);
      toast.error(error.message || 'Failed to update bookmark');
    } finally {
      setBookmarkLoading(false);
    }
  }, [user, topicId, isBookmarked]);

  const toggleFollow = useCallback(async () => {
    if (!user || !topicId) {
      toast.error('Please sign in to follow discussions');
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
        toast.success('Following discussion');
      } else {
        await (supabase as any)
          .from('forum_follows')
          .delete()
          .eq('user_id', user.id)
          .eq('discussion_id', topicId);
        toast.success('Unfollowed discussion');
      }
    } catch (error: any) {
      setIsFollowing(!next);
      toast.error(error.message || 'Failed to update follow status');
    } finally {
      setFollowLoading(false);
    }
  }, [user, topicId, isFollowing]);

  return {
    isBookmarked,
    isFollowing,
    bookmarkLoading,
    followLoading,
    toggleBookmark,
    toggleFollow,
  };
}


