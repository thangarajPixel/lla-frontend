import type { Metadata } from "next"
import { Providers } from "./providers"
import "./globals.css"
import type React from "react"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import {  Mulish, Urbanist } from 'next/font/google';

export const metadata: Metadata = {
  title: "Next.js Boilerplate",
  description: "Next.js 16 with React Query, ESLint, Husky, and Tailwind CSS",
    generator: 'v0.app'
}

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-urbanist',
});

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mulish',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang="en"  className={`${urbanist.variable}`}>
      <body>
        <Providers>
          <Header/>
          <main>
             {children}
          </main>
          <Footer/>
        </Providers>
      </body>
    </html>
  )
}
