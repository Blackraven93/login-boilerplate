import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { id } = await req.json();
  const tweet = await prisma.tweet.findFirst({
    include: {
      likes: true,
    },
    where: {
      id,
    },
  });

  return NextResponse.json({
    like: tweet?.likes.length,
  });
}
