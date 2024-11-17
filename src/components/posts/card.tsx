import type { Post } from '@/api/posts';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-2 border-gray-500 rounded p-2 hover:scale-105 transition-transform cursor-pointer">
      <h2 className="font-bold capitalize text-sm">{post.title}</h2>
      <hr className='my-2 border-1 border-slate-500' />
      <p className="text-justify text-xs">{post.body}</p>
    </article>
  );
}
