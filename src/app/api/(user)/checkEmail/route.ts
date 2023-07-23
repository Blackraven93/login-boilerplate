import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email }: { email: string } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user
    ? NextResponse.json({
        hasEmail: true,
      })
    : NextResponse.json({
        hasEmail: false,
      });
}
