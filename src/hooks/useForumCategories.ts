import { useQuery } from '@tanstack/react-query';
import { fetchForumCategories, ForumCategory } from '@/lib/api/index';

export function useForumCategories() {
  return useQuery<ForumCategory[], Error>({
    queryKey: ['forumCategories'],
    queryFn: fetchForumCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes - categories rarely change
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

