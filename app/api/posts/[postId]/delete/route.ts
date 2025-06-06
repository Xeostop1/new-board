// app/api/posts/[id]/delete/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const postId = context.params.id;

  await prisma.post.delete({
    where: { id: postId },
  });

  return NextResponse.json({ success: true });
}
