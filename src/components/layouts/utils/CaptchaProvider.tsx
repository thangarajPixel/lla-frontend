'use client';

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import WebFooter from "../WebFooter";
import WebHeader from "../WebHeader";
import MainContent from "./MainContent";
import { WebHeaderResponse } from "./types";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CaptchaProvider = ({ response, children }: { response: WebHeaderResponse | undefined; children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAdmissionPage = pathname.startsWith("/admission");
    const isContactPage = pathname === "/contact-us";
    const coursesPage = pathname.startsWith("/courses");
    const searchParams = useSearchParams();

    const isAdmin = searchParams.get("type");

    const enableRecaptcha = isAdmissionPage || isContactPage || coursesPage;

    useEffect(() => {
        if (enableRecaptcha && !isAdmin) {
            document.body.classList.remove("captcha-icon-hidden");
        } else {
            document.body.classList.add("captcha-icon-hidden");
        }
    }, [enableRecaptcha, isAdmin]);

    return (
        <>
            <GoogleReCaptchaProvider
                reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                scriptProps={{
                    async: true,
                    defer: true,
                }}
            >
                <WebHeader response={response} />
                <MainContent>{children}</MainContent>
                <WebFooter response={response} />
            </GoogleReCaptchaProvider>

        </>
    )
}

export default CaptchaProvider