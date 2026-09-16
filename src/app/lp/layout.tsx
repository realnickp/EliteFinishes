import type { Metadata } from "next";
import { LpChatbot } from "@/components/lp/LpChatbot";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <LpChatbot />
    </>
  );
}
