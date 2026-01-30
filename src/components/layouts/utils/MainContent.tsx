"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { queryClient } from "@/helpers/ConstantHelper";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isAdmissionPage = pathname.startsWith("/admission");
  const isContactPage = pathname === "/contact-us";
  const searchParams = useSearchParams();

  const isAdmin = searchParams.get("type");

  const enableRecaptcha = isAdmissionPage || isContactPage;

  const content = (
    <main
      className={`flex-1 w-full ${isAdmissionPage ? "pt-14" : !isHomePage ? "pt-16" : ""}`}
    >
      {children}
    </main>
  )

  return (
    <QueryClientProvider client={queryClient}>
      {enableRecaptcha && !isAdmin ? (
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          scriptProps={{
            async: true,
            defer: true,
          }}
        >
          {content}
        </GoogleReCaptchaProvider>
      ) : (
        content
      )}
    </QueryClientProvider>
  );
}
