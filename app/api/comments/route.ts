// app/api/posts/[id]/comments/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// 댓글 목록 불러오기
export async function GET(_: Request, context: { params: { id: string } }) {
  const comments = await prisma.comment.findMany({
    where: { postId: context.params.id },
    orderBy: { createdAt: "desc" },
    include: {
      author: true, // ✅ 작성자 이름 포함
    },
  });
  return NextResponse.json(comments);
}

// 댓글 작성
export async function POST(req: Request, context: { params: { id: string } }) {
  const { content } = await req.json();
  const postId = context.params.id;

  // ✅ 댓글 작성자 (임시 고정 유저)
  const user = await prisma.user.findFirst({
    where: { email: "test@example.com" },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const newComment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: user.id, // ✅ 실제 유저의 ID 사용
    },
    include: {
      author: true, // 댓글 응답에 작성자 정보 포함
    },
  });

  return NextResponse.json(newComment);
}
