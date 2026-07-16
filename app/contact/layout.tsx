import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Swahilies team: contact@swahilies.com or +255 682 411 725.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
