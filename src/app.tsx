import { PostsList } from './components/posts';

export function App() {
  return (
    <main className="min-h-screen p-24 bg-slate-300">
      <div className="max-w-4xl mx-auto border-2 border-gray-500 rounded p-2 bg-gray-200">
        <h1 className="text-3xl text-center font-bold font-mono">List of posts with infinite scroll</h1>
        <hr className="mt-2 border-2 border-gray-500 mb-2" />
        <PostsList />
      </div>
    </main>
  );
}
