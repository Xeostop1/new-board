import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { commentId: string } }) {
  const { commentId } = params;

  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return new NextResponse("댓글이 삭제되었습니다", { status: 200 });
  } catch (error) {
    console.error("댓글 삭제 오류:", error); // 🐞 콘솔 출력 꼭 추가!
    return new NextResponse("서버 오류로 삭제할 수 없습니다.", { status: 500 });
  }
}
