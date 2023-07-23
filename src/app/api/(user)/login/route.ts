import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

export interface IUser {
  password?: string;
  email: string;
}

export async function POST(request: Request) {
  const body: IUser = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!body.password) return;

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    return new Response(JSON.stringify(userWithoutPass));
  } else return new Response(JSON.stringify(null));
}
