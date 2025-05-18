import { config } from "dotenv";
config({ path: ".env" }); // 또는 .env.local

console.log("▶︎ Connecting to", process.env.DATABASE_URL);

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: { email: "test@example.com", name: "테스트유저" },
  });

  const postsData = Array.from({ length: 50 }, (_, i) => ({
    title: `샘플 포스트 #${i + 1}`,
    content: "이 게시물은 테스트용 더미 데이터입니다.",
    authorId: user.id,
    likes: Math.floor(Math.random() * 100), // 0~99 랜덤 좋아요
  }));

  await prisma.post.createMany({ data: postsData });

  console.log("🌱 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
