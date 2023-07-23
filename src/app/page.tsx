"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  /**
   * 1. 로그인 여부를 확인하여 로그인 되어 있으면 홈페이지, 그렇지 않으면 로그인 페이지로
   * 2. 로그인이 완료되었으면 해당 메인 페이지에 데이터베이스에 존재하는 모든 컨텐츠 확인
   * 3. 컨텐츠 작성 가능
   */

  /**
   *  update: UpdateSession
      data: null
      status: "unauthenticated" | "loading"
   */

  const { data: session, status } = useSession();
  if (status !== "authenticated") return redirect("/log-in");

  console.log(session);
  const onClick = () => {
    // `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api`,
    const res = fetch("http://localhost:3000/api/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "cute_parrot",
        password: "12345",
        email: "RedParrot@gmail.com",
      }),
    });

    res.then((data) => console.log(data));
  };

  return (
    <main className="flex w-screen h-screen items-center justify-between">
      <button onClick={onClick}>click!</button>
    </main>
  );
}
