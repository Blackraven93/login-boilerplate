"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

async function getTweet(
  url: string,
  { arg: { id, username } }: { arg: { id: string; username: string } }
) {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      id: +id,
      username,
    }),
  }).then((res) => res.json());
}

async function getLike(url: string, { arg: { id } }: { arg: { id: string } }) {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      id: +id,
    }),
  }).then((res) => res.json());
}

export default function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  /**
   * 1. 트윗의 자세한 컨텐츠 좋아요 버튼 확인 가능
   * 2. 좋아요 선택 시 데이터베이스에 저장 가능
   */
  const [likeCount, setLikeCount] = useState(0);
  const search = useSearchParams();
  const [description, username] = [search.get("text"), search.get("username")];

  const { data, isLoading, mutate } = useSWR("/api/like", (url) =>
    getLike(url, {
      arg: {
        id,
      },
    })
  );
  const { trigger } = useSWRMutation("/api/tweet", (url) =>
    getTweet(url, {
      arg: {
        id,
        username: username ? username : "",
      },
    })
  );

  if (isLoading) return <>로딩중 입니다!</>;

  const handleClick = async () => {
    const { like } = await trigger();
    mutate("/api/like");
    setLikeCount(like);
  };
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 items-start w-[300px] border-point border rounded-2xl p-3">
        <div className="w-full flex justify-between">
          <div className="text-sm font-thin flex">
            <span>{username}</span>
            <span className="ml-2">Like {data.like}</span>
          </div>
          <button
            className="px-4 py-2 bg-point rounded-3xl text-white"
            onClick={handleClick}
          >
            Like
          </button>
        </div>

        <div>{description}</div>
      </div>
    </main>
  );
}
