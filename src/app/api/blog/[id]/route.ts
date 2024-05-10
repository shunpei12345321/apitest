import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  console.log("params: " + params);
  const id: number = parseInt(params.id);

  const blog = await prisma.post.findFirst({ where: { id } });
  return NextResponse.json({ message: "Success", blog }, { status: 200 });
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);
  const { title, content } = await req.json();

  const blog = await prisma.post.update({
    data: { title, content },
    where: { id },
  });
  return NextResponse.json({ message: "Success", blog }, { status: 200 });
};

//使っていないです
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);

  const blog = await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Success", blog }, { status: 200 });
};