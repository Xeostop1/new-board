import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 테스트용 유저 만들기
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: { email: "test@example.com", name: "테스트유저" },
  });

  // 포스트 50개 생성
  const postsData = Array.from({ length: 50 }, (_, i) => ({
    title: `샘플 포스트 #${i + 1}`,
    content: "이 게시물은 테스트용 더미 데이터입니다.",
    authorId: user.id,
  }));
  await prisma.post.createMany({ data: postsData });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
