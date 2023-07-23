"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { IUser } from "@/app/api/(user)/login/route";
import fetchJson from "@/lib/fetchJson";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useSearchParams } from "next/navigation";

interface IPassword {
  password: string;
  checkPassword: string;
}

export default function Page({}) {
  /**
   * Model
   * 1. Modal창 트고 Social login && 휴대전화, 이메일, 사용자 아이디
   * 1-1. 회원가입 바로가기
   * 2. 입력시 비밀번호(비밀번호 찾기)
   * 3. 일치 여부 확인
   * 4. 로그인 되었다면
   */

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPassword>();

  const email = useSearchParams().get("email");

  const onSubmit: SubmitHandler<IPassword> = async (data: IPassword) => {
    const fetchEmail = await fetch("http://localhost:3000/api/checkEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });

    const { hasEmail } = await fetchEmail.json();
  };

  return (
    <main className="w-screen h-screen flex justify-center">
      <section className="flex flex-col gap-6 w-7/12 h-full justify-center items-center pl-6">
        <Image src="/scraptor.png" alt="image" width={260} height={39} />
        <form
          className="flex flex-col items-center gap-3 w-[280px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            htmlFor="password"
            className="self-start text-xs font-semibold"
          >
            비밀번호
          </label>
          <input
            className="w-full ring-point border-2 border-point rounded-xl p-1 px-2"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password")}
          />
          <label
            htmlFor="password"
            className="self-start text-xs font-semibold"
          >
            비밀번호 확인
          </label>
          <input
            className="w-full ring-point border-2 border-point rounded-xl p-1 px-2"
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            {...register("checkPassword")}
          />
          <div className=" text-xs text-red-400 font-semibold"></div>
          <button type="submit">로그인</button>
        </form>
        <Link href="/check-password">비밀번호를 잊으셨나요?</Link>
      </section>
    </main>
  );
}
