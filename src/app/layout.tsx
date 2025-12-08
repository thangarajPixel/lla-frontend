export const dynamic = "force-dynamic";

import MainContent from "@/components/layouts/utils/MainContent";
import WebFooter from "@/components/layouts/WebFooter";
import WebHeader from "@/components/layouts/WebHeader";
import SmoothScrollWidget from "@/components/widgets/SmoothScrollWidget";
import type { Metadata } from "next";
import { Mulish, Urbanist } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { getFooterData } from "./api/server";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const areaVariable = localFont({
  src: "../assets/fonts/fonnts.com-Area_Variable_Thin.otf",
  variable: "--font-area-variable",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premier College for Professional Photography in India | LLA",
  description:
    "Founded in 2001, Light &amp; Life Academy is India’s first and only custom designed Professional Photography Institute. Admissions Open for 2025-26",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const response = await getFooterData();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mulish.variable} ${urbanist.variable} ${areaVariable.variable} antialiased flex flex-col min-h-screen`}
      >
        <SmoothScrollWidget>
          <WebHeader response={response?.data} />
          <Toaster position="top-right" expand richColors />
          <MainContent>{children}</MainContent>
          <WebFooter />
        </SmoothScrollWidget>
      </body>
    </html>
  );
}
