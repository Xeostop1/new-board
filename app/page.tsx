// app/page.tsx
import PostList from "@/components/PostList";

export default function HomePage() {
  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🔥 인기 글</h1>
      <PostList />
    </main>
  );
}
