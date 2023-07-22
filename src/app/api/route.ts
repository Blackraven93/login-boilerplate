import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "../../../prisma";
import { NextResponse } from "next/server";
import { sessionOptions } from "@/lib/session";

export type User = {
  isLoggedIn: boolean;
};

export async function GET(req: Request, res: Response) {
  return NextResponse.json({ text: "dd" });
}

export async function POST(req: Request, res: Response) {
  withIronSessionApiRoute(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    console.log(req, res);
    console.log("in api POST function");
    const id = req.session.user ? req.session.user.id : 1;

    const foundUser = prisma.user.findFirst({
      where: { id },
    });
    await req.session.save();

    return NextResponse.json({ user: foundUser, text: "dd" });
  },
  sessionOptions);

  const { id, email } = (await req.json()) as any;

  /**
   * 서버로직
   * - 중복 이메일 확인
   * - 이메일이 있으면 이메일에 해당하는 패스워드 일치여부 확인
   */

  return NextResponse.json({
    type: "server",
    id,
    email,
  });
}
