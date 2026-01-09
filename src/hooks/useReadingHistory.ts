import { useCallback } from 'react';
import { useUser } from '@/context/UserContext';

export function useReadingHistory() {
  const { user } = useUser();

  const addToHistory = useCallback(async (
    contentType: 'article' | 'forum' | 'video' | 'analytics',
    contentId: string,
    progressPercent: number = 0
  ) => {
    if (!user) return;
    // Mock - would use Supabase in real implementation
  }, [user]);

  const updateProgress = useCallback(async (
    contentType: 'article' | 'forum' | 'video' | 'analytics',
    contentId: string,
    progressPercent: number
  ) => {
    if (!user) return;
    // Mock - would use Supabase in real implementation
  }, [user]);

  return { addToHistory, updateProgress };
}
