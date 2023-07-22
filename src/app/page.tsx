"use client";

import Image from "next/image";

export default function Home() {
  /**
   * 1. 로그인 여부를 확인하여 로그인 되어 있으면 홈페이지, 그렇지 않으면 로그인 페이지로
   * 2. 로그인이 완료되었으면 해당 메인 페이지에 데이터베이스에 존재하는 모든 컨텐츠 확인
   * 3. 컨텐츠 작성 가능
   */

  const onClick = () => {
    const res = fetch(
      // `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api`,
      "http://localhost:3000/api",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 1,
          email: "reblackraven@gmail.com",
        }),
      }
    );

    res.then((data) => data.json().then((json) => console.log(json)));
  };

  return (
    <main className="flex w-screen h-screen items-center justify-between">
      <button onClick={onClick}>click!</button>
    </main>
  );
}
