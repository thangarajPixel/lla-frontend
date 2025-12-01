"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { queryClient } from "@/lib/utils";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
   const facultyPage = pathname === "/faculty";
     const formPage = pathname.startsWith("/admission");
     const aboutPage = pathname.startsWith("/about-us");
  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={`flex-1 w-full ${formPage ? "pt-16" : !isHomePage ? "pt-17" : ""}`}
      >
        {children}
      </main>
    </QueryClientProvider>
  );
}
