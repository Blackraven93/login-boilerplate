import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Tweet = {
  id: number;
  text: string;
  createdAt: Date;
  userId: number;
};

export type Content = {
  id: number;
  text: string;
  createdAt: Date;
  username: string;
};

export async function GET(req: Request, res: Response) {
  const tweets: Array<Tweet> = await prisma.tweet.findMany();

  const contents = await Promise.all(
    [...tweets].map(async ({ userId, ...rest }) => {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      return {
        ...rest,
        username: user?.username,
      };
    })
  );

  return NextResponse.json({
    contents,
  });
}

export async function POST(req: Request, res: Response) {
  const { id, username } = await req.json();
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) return NextResponse.json({ ok: false });

  await prisma.like.create({
    data: {
      userId: user.id,
      tweetId: id,
    },
  });

  const tweet = await prisma.like.findMany({
    where: {
      tweetId: id,
    },
  });

  return NextResponse.json({
    like: tweet.length,
  });
}
