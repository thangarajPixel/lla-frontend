export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Mulish, Urbanist } from "next/font/google";
import MainContent from "@/components/layouts/utils/MainContent";
import WebFooter from "@/components/layouts/WebFooter";
import WebHeader from "@/components/layouts/WebHeader";
import SmoothScrollWidget from "@/components/widgets/SmoothScrollWidget";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premier College for Professional Photography in India | LLA",
  description:
    "Founded in 2001, Light &amp; Life Academy is India’s first and only custom designed Professional Photography Institute. Admissions Open for 2025-26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mulish.variable} ${urbanist.variable} antialiased flex flex-col min-h-screen`}
      >
        <SmoothScrollWidget>
          <WebHeader />
          <MainContent>{children}</MainContent>
          <WebFooter />
        </SmoothScrollWidget>
      </body>
    </html>
  );
}
