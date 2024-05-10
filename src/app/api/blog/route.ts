import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export const GET = async (req: Request, res: NextResponse) => {
  const blogs = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ message: "Success", blogs }, { status: 200 });
};

export const POST = async (req: Request, res: NextResponse) => {
  const { title, content, authorId } = await req.json();

  const blog = await prisma.post.create({
    data: { title, content, authorId },
  });
  return NextResponse.json({ message: "Success", blog }, { status: 200 });
};