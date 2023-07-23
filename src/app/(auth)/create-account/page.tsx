"use client";

import { signIn } from "next-auth/react";
import DatePicker from "@/components/DatePicker";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

const UserAccount = {
  Create({
    step,
    setStep,
  }: {
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
  }) {
    switch (step) {
      case 1: {
        return (
          <>
            <div>3단계 중 {step}단계</div>
            <form>
              <h1>계정을 생성하세요</h1>
              <label htmlFor="name">이름</label>
              <input type="text" name="name" />
              <label htmlFor="phone">휴대폰</label>
              <input type="text" name="phone" />
              <label htmlFor="email">이메일</label>
              <input type="email" name="email" />
              <div>
                <h2>생년월일</h2>
                <div>
                  이 정보는 공개적으로 표시되지 않습니다. 비즈니스, 반려동물 등
                  계정 주제에 상관없이 나의 연령을 확인하세요.
                </div>
                <DatePicker.Year />
                <DatePicker.Month />
                <DatePicker.Day />
              </div>
              <button type="button" onClick={() => signIn()}>
                다음
              </button>
            </form>
          </>
        );
      }
      case 2: {
        /**
         * password, checkingPassword
         */
        return 2;
      }
      case 3: {
        return 3;
      }
      default:
        return;
    }
  },
};

export default function Page({}) {
  /**
   * Model
   * 1. name, phone, birth_date,
   *  - 중복 확인
   * 2. Authentication(SMS)
   * 3. password
   * 4. profile image
   */
  const [step, setStep] = useState<number>(0);
  const handleOnClick = () => setStep((prev) => prev + 1);
  return (
    <main>
      <section>
        {step === 0 ? (
          <>
            <h1>Scraptor 가입하기</h1>
            <div>
              <button type="button" onClick={handleOnClick}>
                회원가입 하기
              </button>
            </div>
            <div>
              이미 계정이 있으신가요? <strong>로그인</strong>
            </div>
          </>
        ) : (
          <UserAccount.Create step={step} setStep={setStep} />
        )}
      </section>
    </main>
  );
}
