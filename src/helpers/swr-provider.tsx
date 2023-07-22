"use client";
import fetchJson from "@/lib/fetchJson";
import { ReactNode } from "react";
import { SWRConfig } from "swr";
export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (error) => {
          console.error(error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
