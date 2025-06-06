import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const { content } = await req.json();

  const user = await prisma.user.findFirst({
    where: { email: "test@example.com" },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const newComment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: user.id,
    },
  });

  return NextResponse.json(newComment); // ❗ DB에 성공적으로 저장된 후 응답
}
