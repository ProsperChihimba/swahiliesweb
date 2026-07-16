import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Navbar";
import FAQ from "./components/Faqs";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://swahilies.com"),
  title: {
    default: "Swahilies — Bookkeeping and Payments App for African SMEs",
    template: "%s · Swahilies",
  },
  description:
    "Swahilies is the operating and financial system for African SMEs. Manage sales, stock, and debts; receive and send cross-border payments; and access credit, all in one app.",
  applicationName: "Swahilies",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Swahilies — Bookkeeping and Payments App for African SMEs",
    description:
      "One app for business management, cross-border payments, and credit access. Built for African SMEs.",
    url: "https://swahilies.com",
    siteName: "Swahilies",
    images: [{ url: "/assets/images/og-image.jpeg" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swahilies — Bookkeeping and Payments App for African SMEs",
    description:
      "One app for business management, cross-border payments, and credit access. Built for African SMEs.",
    images: ["/assets/images/og-image.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <FAQ />
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
