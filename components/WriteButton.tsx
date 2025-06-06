"use client";

import { useState } from "react";
import WriteModal from "./WriteModal";
import { Post } from "@/types/Post";

type Props = {
  onSuccess: (newPost: Post) => void;
};

export default function WriteButton({ onSuccess }: Props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)} className="border px-4 py-2 rounded bg-white shadow">
        ✏️ 새로운 소식이 있나요?
      </button>
      {show && (
        <WriteModal
          onClose={() => setShow(false)}
          onSuccess={(newPost) => {
            onSuccess(newPost);
            setShow(false);
          }}
        />
      )}
    </>
  );
}
