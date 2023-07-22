import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import prisma from "../../../prisma";
import { NextResponse } from "next/server";
import { sessionOptions } from "@/lib/session";
console.log("outside");
const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.session.user ? req.session.user.id : 1;

  const foundUser = prisma.user.findFirst({
    where: { id },
  });
  req.session.user = {
    username: "raven",
  };
  await req.session.save();

  return NextResponse.json({ user: foundUser, text: "dd" });
};

export type User = {
  isLoggedIn: boolean;
};

export async function GET(req: Request, res: Response) {
  return NextResponse.json({ text: "dd" });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  /**
   * 서버로직
   * - 중복 이메일 확인
   * - 이메일이 있으면 이메일에 해당하는 패스워드 일치여부 확인
   */
  withIronSessionApiRoute(userHandler, sessionOptions);

  console.log(req.session);
  return NextResponse.json({
    type: "server",
  });
}
