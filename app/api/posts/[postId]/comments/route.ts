import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ✅ 댓글 조회 (GET)
export async function GET(req: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;

  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      author: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(comments);
}

// ✅ 댓글 작성 (POST)
export async function POST(req: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const { content } = await req.json();

  // 테스트용 사용자 ID
  const user = await prisma.user.findFirst({
    where: { email: "test@example.com" },
  });

  if (!user) {
    return new NextResponse("사용자를 찾을 수 없습니다.", { status: 404 });
  }

  const newComment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: user.id,
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json(newComment);
}
