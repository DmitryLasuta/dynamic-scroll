import { useIntersection } from '@/shared/hooks';
import { PostCard } from './card';
import { useGetPostList } from './hooks';
import { ErrorBoundary } from '@/components/error-boundary';

export function PostsList() {
  const {
    data: postList,
    isLoading: postListIsLoading,
    isSuccess: postListHasLoadedSuccessfully,
    fetchNextPage: fetchNextPagePostList,
    isFetchingNextPage: nextPostListPageIsFetching,
  } = useGetPostList();

  const cursorRef = useIntersection(() => fetchNextPagePostList());
  return (
    <ErrorBoundary>
      {postListIsLoading && <p>Loading...</p>}
      {postListHasLoadedSuccessfully && (
        <ul className="grid grid-cols-1 gap-2 max-w-lg mx-auto">
          {postList.map(post => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
      {nextPostListPageIsFetching && <p>Loading...</p>}
      <div ref={cursorRef}></div>
    </ErrorBoundary>
  );
}
