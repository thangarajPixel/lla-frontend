import type { Metadata } from "next";
import { Mulish, Urbanist } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "sonner";
import MainContent from "@/components/layouts/utils/MainContent";
import WebFooter from "@/components/layouts/WebFooter";
import WebHeader from "@/components/layouts/WebHeader";
import SmoothScrollWidget from "@/components/widgets/SmoothScrollWidget";
import { getFooterData } from "./api/server";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const areaVariable = localFont({
  src: "../assets/fonts/fonnts.com-Area_Variable_Thin.otf",
  variable: "--font-area-variable",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Premier College for Professional Photography in India | LLA",
  description:
    "Founded in 2001, Light &amp; Life Academy is India's first and only custom designed Professional Photography Institute. Admissions Open for 2025-26",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await getFooterData();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="facebook-domain-verification" content="k5693zc2efk6uddzpthezpudncfebk" />
      </head>
      <body
        className={`${mulish.variable} ${urbanist.variable} ${areaVariable.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRFFVFV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KRFFVFV');`}
        </Script>

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-L11DDSN0PP" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-L11DDSN0PP');`}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "lr881zkmpm");`}
        </Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1252942248463992');
fbq('track', 'PageView');`}
        </Script>

        {/* Google Analytics UA */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=UA-1533023-1" strategy="afterInteractive" />
        <Script id="ga-ua" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag() {dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-1533023-1', { 'anonymize_ip': false });`}
        </Script>

        {/* Google Ads */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-828641801" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-828641801');`}
        </Script>
        
        <SmoothScrollWidget>
          <WebHeader response={response?.data} />
          <Toaster position="top-right" expand richColors />
          <MainContent>{children}</MainContent>
          <WebFooter response={response?.data} />
        </SmoothScrollWidget>
      </body>
    </html>
  );
}
