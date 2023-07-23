"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Content } from "./api/(content)/tweet/route";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  text: string;
};

async function getLike(
  url: string,
  { arg: { email } }: { arg: { email: string | null | undefined } }
) {
  if (!email) return;

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  }).then((res) => res.json());
}

async function createContents(
  url: string,
  { arg: { text, email = "" } }: { arg: { text: string; email?: string } }
) {
  if (!text) return;

  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      text,
      email,
    }),
  }).then((res) => res.json());
}

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
  const router = useRouter();
  const [mode, setMode] = useState<"all" | "liked">("all");
  const tweet = useSWR("/api/tweet");
  const likedTweet = useSWRMutation("/api/likedTweet", (url) =>
    getLike(url, {
      arg: {
        email: session && session.user ? session.user.email : "",
      },
    })
  );
  const upload = useSWRMutation(
    "/api/tweet/createTweet",
    (url: string, { arg }: any) => {
      return createContents(url, {
        arg: {
          text: arg.text,
          email: arg.email,
        },
      });
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  if (likedTweet.isMutating) {
    return <>로딩 중 입니다!</>;
  }
  if (tweet.isLoading) return <>로딩 중 입니다!</>;

  if (status === "loading") return <h1>인증 중입니다. 잠시만 기다려주세요!</h1>;

  if (status !== "authenticated") {
    return router.push(`/log-in?errorMessage=인증오류 입니다.`);
  }

  const handleUpload: SubmitHandler<Inputs> = async (data) => {
    const { text } = data;
    const result = await upload.trigger({ text, email: session.user?.email });
    tweet.mutate("/api/tweet");
    likedTweet.trigger();
  };

  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <section className="w-9/12 border-1 border-black h-full">
        <h1 className="mt-4 text-4xl font-bold">Home</h1>
        <div className="flex justify-between mt-4 cursor-pointer">
          <button
            className={`w-full flex justify-center hover:border-b-2 ${
              mode === "all" && "border-b-2 border-point"
            }`}
            onClick={() => {
              setMode("all");
            }}
          >
            All
          </button>
          <button
            className={`w-full flex justify-center border-b-2   ${
              mode === "liked" && "border-b-2 border-point"
            }`}
            onClick={() => {
              likedTweet.trigger();
              setMode("liked");
            }}
          >
            Liked
          </button>
        </div>
        <div className="w-full my-5">
          <form
            className="flex justify-between"
            onSubmit={handleSubmit(handleUpload)}
          >
            <input
              type="text"
              placeholder="What is happening?!"
              className="p-2"
              {...register("text")}
            />
            <button
              type="submit"
              className="bg-point p-2 rounded-2xl text-white"
            >
              Upload
            </button>
          </form>
        </div>
        <div>
          {mode === "all"
            ? [...tweet?.data?.contents].map(
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
                      tweet.data.contents.length - 1 === index && "border-b"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="font-semibold">{username}</div>
                    </div>
                    <div className="mt-2">{text}</div>
                  </Link>
                )
              )
            : likedTweet.data &&
              [...likedTweet?.data?.contents].map(
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
                      likedTweet.data.contents.length - 1 === index &&
                      "border-b"
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
