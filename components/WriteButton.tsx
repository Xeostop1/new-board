"use client";

import { useState } from "react";
import WriteModal from "./WriteModal";

export default function WriteButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="border px-4 py-2 rounded bg-white shadow mb-4"
      >
        ✏️ 새로운 소식이 있나요?
      </button>
      {show && (
        <WriteModal
          onClose={() => setShow(false)}
          onSuccess={() => window.location.reload()} // 👉 또는 상태 업데이트
        />
      )}
    </>
  );
}
