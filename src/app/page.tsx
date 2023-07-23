"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import useSWR from "swr";
import { Content } from "./api/(content)/tweet/route";
import Link from "next/link";

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

  const { data, mutate, isLoading } = useSWR("/api/tweet");

  if (isLoading) return <>로딩 중 입니다!</>;
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // if (status === "loading") return <h1>인증 중입니다. 잠시만 기다려주세요!</h1>;

  // if (status !== "authenticated") {
  //   return router.push(`/log-in?errorMessage=인증오류 입니다.`);
  // }

  const handleContentClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    data: Content
  ) => {
    console.log(data);
  };

  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <section className="w-9/12 border-1 border-black h-full">
        <h1 className="mt-4 text-4xl font-bold">Home</h1>
        <div className="flex justify-between mt-4">
          <div className="w-full flex justify-center hover:border-b-2 hover:border-point">
            All
          </div>
          <div className="w-full flex justify-center border-b-2 border-transparent hover:border-b-2 hover:border-point">
            Liked
          </div>
        </div>
        <div className="w-full my-5">
          <form action="" className="flex justify-between">
            <input
              type="text"
              placeholder="What is happening?!"
              className="p-2"
            />
            <button className="bg-point p-2 rounded-2xl text-white">
              Upload
            </button>
          </form>
        </div>
        <div>
          {[...data.contents].map(
            ({ id, createdAt, username, text }, index) => (
              <Link
                href={{
                  pathname: `/tweet/${id}`,
                  query: {
                    username,
                    text,
                  },
                }}
                key={createdAt + index}
                className={`flex flex-col w-full gap-1 border-t border-r border-l border-black p-3 ${
                  data.contents.length - 1 === index && "border-b"
                }`}
              >
                <div className="flex justify-between">
                  <div className="font-semibold">{username}</div>
                </div>
                <div className="mt-2">{text}</div>
              </Link>
            )
          )}
        </div>
      </section>
    </main>
  );
}
