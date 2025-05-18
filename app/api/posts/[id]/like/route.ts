// app/api/posts/[id]/like/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(_: Request, { params }: { params: { id: string } }) {
  const postId = params.id;

  const updated = await prisma.post.update({
    where: { id: postId },
    data: {
      likes: { increment: 1 }, // 좋아요 +1
    },
  });

  return NextResponse.json(updated);
}
