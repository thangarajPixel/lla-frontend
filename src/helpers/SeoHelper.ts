import type { Metadata } from "next";
import { getSeoData } from "@/app/api/server";
import { headers } from "next/headers";

interface SeoCard {
  id: number;
  title: string;
  description: string;
  page: string;
  KeyWords: string | null;
}

interface SeoData {
  SeoCard: SeoCard[];
}

const pageMapping: Record<string, string> = {
  "/": "Home",
  "/campus": "Campus",
  "/faculty": "Faculty",
  "/gallery": "Gallery",
  "/about": "About",
  "/life-at-lla": "Life-At-Lla",
  "/blog": "Blog",
  "/media": "Media",
  "/contact-us": "Contact-Us",
  "/faq": "Faq",
  "/terms-and-conditions": "Terms-And-Condition",
  "/privacy-policy": "Privacy-Policy",
  "/admission": "Admission",
};

export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host") || "llacademy.org";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  return `${protocol}://${host}`;
}

export async function generateSeoMetadata(
  pagePath: string,
  baseUrl?: string
): Promise<Metadata> {
  const finalBaseUrl = baseUrl || (await getBaseUrl());

  try {
    const { data } = await getSeoData();
    const seoData = data as SeoData;

    const pageName = pageMapping[pagePath];
    if (!pageName) {
      return {
        alternates: {
          canonical: `${finalBaseUrl}${pagePath}`,
        },
      };
    }

    const seoCard = seoData?.SeoCard?.find((card) => card.page === pageName);

    if (!seoCard) {
      return {
        alternates: {
          canonical: `${finalBaseUrl}${pagePath}`,
        },
      };
    }

    return {
      title: seoCard?.title,
      description: seoCard?.description,
      ...(seoCard?.KeyWords && { keywords: seoCard?.KeyWords }),
      alternates: {
        canonical: `${finalBaseUrl}${pagePath}`,
      },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      alternates: {
        canonical: `${finalBaseUrl}${pagePath}`,
      },
    };
  }
}
