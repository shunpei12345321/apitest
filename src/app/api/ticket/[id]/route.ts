import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/PrismaClient";

export const GET = async (req: Request,
    { params }: { params: { id: string } },
    res: NextResponse
  ) => {
    const idm = params.id;

    const ticket = await prisma.user.findMany({ where:{ idm }});
    return NextResponse.json({ message: "Success", ticket }, { status: 200 });
  };
