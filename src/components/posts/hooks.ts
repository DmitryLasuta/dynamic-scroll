import { postsApi } from '@/api/posts';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * Hook for fetching a list of posts.
 *
 * @param options - Optional query options.
 * @returns The list of posts.
 */
export const useGetPostList = () => {
  return useInfiniteQuery({
    queryKey: ['posts', 'list'],
    queryFn: ({ signal, pageParam }) => postsApi.getPosts({ page: pageParam }, { signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined),
    select: ({ pages }) => pages.flatMap(page => page),
  });
};
