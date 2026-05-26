import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Swahilies works: business management, collection & banking, and credit & lending in one app.",
};

export default function CardsLayout({ children }: { children: ReactNode }) {
  return children;
}
