import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  // console.log("from middleware", { user });

  // demo:
  // if (!user) {
  //   return new NextResponse(null, { status: 403 }); // unauthorized to see pages inside admin/
  // }

  return res;
};
