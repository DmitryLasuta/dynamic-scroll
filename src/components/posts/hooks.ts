import { type Post, postsApi } from '@/api/posts';
import { useQuery } from '@tanstack/react-query';
import type { QueryOptions } from '@/shared/types';

/**
 * Hook for fetching a list of posts.
 *
 * @param options - Optional query options.
 * @returns The list of posts.
 */
export const useGetPostList = (options?: QueryOptions<Post[]>) => {
  return useQuery({
    queryKey: ['posts', 'list'],
    queryFn: ({ signal }) => postsApi.getPosts({ signal }),
    ...options,
  });
};
