import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kuza Business",
  description:
    "Kuza Business: sales, stock, expenses, and customer balances in one app. Built for African SMEs on top of Swahilies payments.",
};

export default function BusinessLayout({ children }: { children: ReactNode }) {
  return children;
}
