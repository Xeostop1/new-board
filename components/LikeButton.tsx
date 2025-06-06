"use client";

import { useState } from "react";

type Props = {
  postId: string;
  initialLikes: number;
  onToggle?: (delta: number) => void; // ✅ 변경량 전달
};

export default function LikeButton({ postId, initialLikes, onToggle }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    await fetch(`/api/posts/${postId}/like`, {
      method: "PUT",
    });

    const delta = liked ? -1 : 1;
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
    if (onToggle) onToggle(delta);
  };

  return (
    <button
      onClick={handleLike}
      className={`text-sm px-3 py-1 rounded ${
        liked ? "bg-red-200" : "bg-red-100 hover:bg-red-200"
      }`}
    >
      ❤️ {likes} 좋아요
    </button>
  );
}
