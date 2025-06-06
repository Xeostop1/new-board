// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import PostList from "@/components/PostList";
import WriteButton from "@/components/WriteButton";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🔥 인기 글</h1>
      <WriteButton onSuccess={(newPost) => setPosts((prev) => [newPost, ...prev])} />
      <PostList posts={posts} setPosts={setPosts} />
    </main>
  );
}
