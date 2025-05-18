// app/components/PostList.tsx
"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import SortDropdown from "./SortDropdown";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sort, setSort] = useState("추천");

  useEffect(() => {
    fetch(`/api/posts?sort=${sort}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [sort]);

  const handleLike = async (postId: string) => {
    await fetch(`/api/posts/${postId}/like`, {
      method: "PUT",
    });

    // UI에도 바로 반영
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)));
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <SortDropdown value={sort} onChange={setSort} />
      </div>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded bg-white">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.likes}</p>
          <p>{post.id}</p>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">❤️ {post.likes} 좋아요</p>
            <button
              onClick={() => handleLike(post.id)}
              className="text-sm px-3 py-1 rounded bg-red-100 hover:bg-red-200"
            >
              ❤️ 좋아요
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
