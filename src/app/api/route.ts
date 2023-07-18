import { PrismaClient } from "@prisma/client";
import prisma from "../../../prisma";
import { NextResponse } from "next/server";

async function createUser() {
  await prisma.user.upsert({
    create: {
      email: "black@gmail.com",
    },
    where: { email: "black@gamil.com" },
    update: {},
  });

  const users = await prisma.user.findMany();
  console.log(users);
}

export async function GET(request: Request) {
  await createUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  return NextResponse.json({
    data: {
      name: "raven",
      age: 18,
    },
  });
}
