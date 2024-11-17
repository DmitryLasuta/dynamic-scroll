import { postsApi } from '@/api/posts';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * Hook for fetching a list of posts.
 *
 * @returns The list of posts.
 */
export const useGetPostList = () => {
  return useInfiniteQuery({
    ...postsApi.getPostsQueryOptions(),
  });
};
