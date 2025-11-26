"use client";

import { usePathname } from "next/navigation";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const formPage = pathname === "/application-form";

  return (
    <main className={`flex-1 w-full ${formPage ? "pt-16" : !isHomePage ? "pt-20 md:pt-24" :  ""}`}>
      {children}
    </main>
  );
}
