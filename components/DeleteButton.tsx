"use client";

type Props = {
  targetId: string; // ✅ postId or commentId
  apiPath: string; // ✅ /api/posts or /api/comments
  onDeleted: () => void;
};

export default function DeleteButton({ targetId, apiPath, onDeleted }: Props) {
  const handleDelete = async () => {
    const ok = confirm("정말 삭제하시겠어요?");
    if (!ok) return;

    await fetch(`${apiPath}/${targetId}/delete`, {
      method: "DELETE",
    });

    onDeleted(); // 삭제 후 리스트에서 제거
  };

  return (
    <button
      onClick={handleDelete}
      className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-red-500"
    >
      삭제
    </button>
  );
}
