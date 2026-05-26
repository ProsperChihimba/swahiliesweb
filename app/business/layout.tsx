import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Business",
  description:
    "Manage sales, stock, and debts; receive digital payments; pay suppliers locally and abroad — built for African SMEs.",
};

export default function BusinessLayout({ children }: { children: ReactNode }) {
  return children;
}
