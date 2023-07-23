import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { SWRProvider } from "@/helpers/swr-provider";
import Provider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Scraptor",
  description: "Research analysis SaaS Product",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <SWRProvider>
        <html lang="ko">
          <body className={inter.className}>{children}</body>
        </html>
      </SWRProvider>
    </Provider>
  );
}
