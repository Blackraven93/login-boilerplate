"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { IUser } from "@/app/api/(user)/login/route";
import fetchJson from "@/lib/fetchJson";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({}) {
  /**
   * Model
   * 1. Modal창 트고 Social login && 휴대전화, 이메일, 사용자 아이디
   * 1-1. 회원가입 바로가기
   * 2. 입력시 비밀번호(비밀번호 찾기)
   * 3. 일치 여부 확인
   * 4. 로그인 되었다면
   */

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUser>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    const { email } = data;
    const fetchEmail = await fetch("http://localhost:3000/api/checkEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });

    const { hasEmail } = await fetchEmail.json();

    return hasEmail
      ? router.push(`/log-in/check-password?email=${email}`)
      : setEmailErrorMessage("가입되어 있지 않은 이메일 입니다!");
  };

  return (
    <main className="w-screen h-screen flex">
      <section className="w-full h-full flex items-center justify-center">
        <Image src="/blob.svg" alt="image" width={600} height={600} />
      </section>
      <section className="flex flex-col gap-6 w-10/12 h-full justify-center pl-6">
        <Image src="/scraptor.png" alt="image" width={192} height={39} />
        <h1 className="text-4xl font-bold">스크랩터에 로그인하기</h1>
        <form
          className="flex flex-col items-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email"></label>
          <input
            type="text"
            placeholder="이메일 주소를 입력해주세요"
            {...register("email")}
          />
          <div className=" text-xs text-red-400 font-semibold">
            {emailErrorMessage}
          </div>
          <button type="submit">다음</button>
        </form>
        <Link href="/check-password">비밀번호를 잊으셨나요?</Link>
        <div>
          계정이 없으신가요?{" "}
          <Link href="/create-account" className="">
            가입하기
          </Link>
        </div>
      </section>
    </main>
  );
}
