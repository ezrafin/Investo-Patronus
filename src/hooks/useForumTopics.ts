import { useQuery } from '@tanstack/react-query';
import { fetchForumTopics, ForumTopic } from '@/lib/api/index';

interface UseForumTopicsOptions {
  categoryId?: string;
}

export function useForumTopics(options?: UseForumTopicsOptions) {
  return useQuery<ForumTopic[], Error>({
    queryKey: ['forumTopics', { category: options?.categoryId }],
    queryFn: () => fetchForumTopics(options?.categoryId),
    staleTime: 1 * 60 * 1000, // 1 minute - topics change more frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

