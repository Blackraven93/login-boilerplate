import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { email } = await req.json();

  const user = await prisma.user.findFirst({
    include: {
      tweets: true,
    },
    where: {
      email,
    },
  });

  if (!user || !user.tweets)
    return NextResponse.json({
      ok: false,
    });

  const contents = await Promise.all(
    [...user?.tweets].map(async ({ userId, ...rest }) => {
      const targetUser = await prisma.user.findFirst({
        where: { id: userId },
      });
      return {
        ...rest,
        username: targetUser?.username,
      };
    })
  );

  return NextResponse.json({
    contents,
  });
}
