"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { queryClient } from "@/helpers/ConstantHelper";

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
        className={`flex-1 w-full ${formPage ? "pt-14" : !isHomePage ? "pt-16" : ""}`}
      >
        {children}
      </main>
    </QueryClientProvider>
  );
}
