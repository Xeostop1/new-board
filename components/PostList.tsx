"use client";

import { useState } from "react";
import { Post } from "@/types/Post";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CommentSection from "@/components/CommentSection";
// TypeScript에서 useState로 만든 상태를 외부에서 조작할 수 있도록 타입을 정확히 정의한 것
// React.Dispatch 상태를 업데이트하는 함수 타입
// React.SetStateAction<Post[]>	setPosts에 전달할 수 있는 값의 타입

type Props = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export default function PostList({ posts, setPosts }: Props) {
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({}); // ***

  const handleCommentChange = (postId: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value })); // ***
  };

  const handleCommentSubmit = async (postId: string) => {
    const content = commentInputs[postId]?.trim();
    if (!content) return;

    await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });

    // 댓글 등록 후 입력값 초기화
    setCommentInputs((prev) => ({ ...prev, [postId]: "" })); // ***
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded bg-white">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm text-gray-500">❤️ {post.likes ?? 0} 좋아요</p>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-400">ID: {post.id}</p>
            <LikeButton
              postId={post.id}
              initialLikes={post.likes}
              onToggle={(delta) => {
                setPosts((prev) =>
                  prev.map((p) => (p.id === post.id ? { ...p, likes: p.likes + delta } : p))
                );
              }}
            />
            <DeleteButton
              targetId={post.id}
              apiPath="/api/posts"
              onDeleted={() => {
                setPosts((prev) => prev.filter((p) => p.id !== post.id));
              }}
            />
          </div>

          <CommentSection
            postId={post.id}
            value={commentInputs[post.id] || ""} // ***
            onChange={(val) => handleCommentChange(post.id, val)} // ***
            onSubmit={() => handleCommentSubmit(post.id)} // ***
          />
        </div>
      ))}
    </div>
  );
}
