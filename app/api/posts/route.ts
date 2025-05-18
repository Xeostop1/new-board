// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get("sort") || "추천";

  // 정렬 옵션을 타입 안전하게 정의
  const sortOptions = {
    추천: { createdAt: "desc" },
    팔로잉: { createdAt: "desc" }, // 추후 팔로잉 기능에 맞게 변경
    좋아요: { likes: "desc" },
    저장됨: { createdAt: "desc" }, // 추후 저장됨 기능에 맞게 변경
  } as const;

  type SortKey = keyof typeof sortOptions;

  // 타입 안전하게 정렬 조건 가져오기
  const orderBy = sortOptions[sort as SortKey] ?? { createdAt: "desc" };

  const posts = await prisma.post.findMany({
    take: 10,
    orderBy,
    include: { author: true },
  });

  return NextResponse.json(posts);
}
