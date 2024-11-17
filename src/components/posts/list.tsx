import { useIntersection } from '@/shared/hooks';
import { PostCard } from './card';
import { useGetPostList } from './hooks';

export function PostsList() {
  const {
    data: postList,
    isLoading: postListIsLoading,
    isSuccess: postListHasLoadedSuccessfully,
    fetchNextPage: fetchNextPagePostList,
  } = useGetPostList();

  const cursorRef = useIntersection(() => fetchNextPagePostList());
  return (
    <>
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
      <div ref={cursorRef}></div>
    </>
  );
}
