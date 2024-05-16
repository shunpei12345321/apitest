import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";

export const POST = async (req: Request, res: NextResponse) => {
  const { email, name, idm } = await req.json();

  const tickets = await prisma.user.create({
    data: { email, name, idm },
  });
  return NextResponse.json({ message: "Success", tickets }, { status: 200 });
};