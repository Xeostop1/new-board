// app/api/posts/[id]/like/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(_: Request, context: { params: { id: string } }) {
  const postId = context.params.id;

  // 현재 좋아요 수 확인
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { likes: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const isLiked = post.likes > 0;

  const updated = await prisma.post.update({
    where: { id: postId },
    data: {
      likes: {
        increment: isLiked ? -1 : 1,
      },
    },
  });

  return NextResponse.json(updated);
}
