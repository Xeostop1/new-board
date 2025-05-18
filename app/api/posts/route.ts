// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort") || "추천";

  const sortOptions = {
    추천: { createdAt: "desc" },
    팔로잉: { createdAt: "desc" },
    좋아요: { likes: "desc" },
    최신순: { createdAt: "desc" },
  } as const;

  type SortKey = keyof typeof sortOptions;
  const orderBy = sortOptions[sort as SortKey] ?? { createdAt: "desc" };

  const posts = await prisma.post.findMany({
    take: 10,
    orderBy,
    include: { author: true },
  });

  return NextResponse.json(posts);
}

// ✅ 글 등록용 POST 추가
export async function POST(req: Request) {
  const body = await req.json();
  const { title, content } = body;

  const user = await prisma.user.findFirst({
    where: { email: "test@example.com" },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      likes: true,
      author: {
        select: { name: true },
      },
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}
