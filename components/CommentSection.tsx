"use client";

import { useEffect, useState } from "react";
import { Comment } from "@/types/Comment"; // ✅ 타입 분리된 것 import
import DeleteButton from "./DeleteButton";
import { formatRelativeTime } from "@/utils/formatTime";

type Props = {
  postId: string;
  value: string; // *** 추가
  onChange: (val: string) => void; // *** 추가
  onSubmit: () => void; // *** 추가
};

export default function CommentSection({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${postId}/comments`)
      .then((res) => res.json())
      .then(setComments);
  }, [postId]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: input }),
      headers: { "Content-Type": "application/json" },
    });
    const newComment: Comment = await res.json();
    setComments((prev) => [newComment, ...prev]);
    setInput("");
  };

  return (
    <div className="mt-4 ">
      <h4 className="font-semibold mb-2">댓글</h4>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder="댓글을 입력하세요"
        className="w-full border rounded p-2 mb-2"
      />
      <button onClick={handleSubmit} className="text-sm bg-black text-white px-4 py-1 rounded">
        등록
      </button>

      <ul className="mt-4 space-y-2">
        {comments.map((c) => (
          <li key={c.id} className="text-sm text-gray-700 flex justify-between items-center">
            <div>
              <p>
                <span className="font-medium">{c.author.name ?? "익명"}: </span>
                {c.content}
              </p>
              <p className="text-xs text-gray-400">{formatRelativeTime(c.createdAt)}</p>
            </div>
            <DeleteButton
              targetId={c.id}
              apiPath="/api/comments"
              onDeleted={() => setComments((prev) => prev.filter((item) => item.id !== c.id))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
