"use client";
import { queryClient } from "@/helpers/ConstantHelper";
import { QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const formPage = pathname.startsWith("/admission");

  return (
    <QueryClientProvider client={queryClient}>
      <main
        className={`flex-1 w-full ${formPage ? "pt-16" : !isHomePage ? "pt-20 md:pt-24" : ""}`}
      >
        {children}
      </main>
    </QueryClientProvider>
  );
}
