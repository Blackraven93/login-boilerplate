import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { text, email } = await req.json();
  console.log(text, email);
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) return NextResponse.json({ ok: false });

  await prisma.tweet.create({
    data: {
      userId: user.id,
      text,
    },
  });

  // await prisma.like.create({
  //   data: {
  //     userId: user.id,
  //     tweetId: id,
  //   },
  // });

  // const tweet = await prisma.like.findMany({
  //   where: {
  //     tweetId: id,
  //   },
  // });

  return NextResponse.json({
    ok: true,
  });
}
