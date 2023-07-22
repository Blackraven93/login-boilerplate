import type { IronSessionOptions } from "iron-session";

type User = {
  id?: number;
  username: string;
  email?: string;
};

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXT_PUBLIC_IRON_SESSION_PASSWORD as string,
  cookieName: "userIronSession",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
