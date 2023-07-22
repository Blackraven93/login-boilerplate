import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
import prisma from "../../../prisma";

const options: IronSessionOptions = {
  cookieName: "user-session",
  password: process.env.NEXT_PUBLIC_IRON_SESSION_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.session.user ? req.session.user.id : 1;

  const foundUser = prisma.user.findFirst({
    where: { id },
  });
  await req.session.save();

  res.json({ ok: true, foundUser });
}

export default withIronSessionApiRoute(handler, options);
