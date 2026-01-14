import type { Metadata } from "next";
import { getSeoData } from "@/app/api/server";

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

const BASE_URL = (process.env.NEXT_APP_SITE_URL || "https://llacademy.org").replace(/"/g, "");

export async function generateSeoMetadata(pagePath: string): Promise<Metadata> {
  try {
    const { data } = await getSeoData();
    const seoData = data as SeoData;

    const pageName = pageMapping[pagePath];
    if (!pageName) {
      return {
        alternates: {
          canonical: `${BASE_URL}${pagePath}`,
        },
      };
    }

    const seoCard = seoData?.SeoCard?.find((card) => card.page === pageName);

    if (!seoCard) {
      return {
        alternates: {
          canonical: `${BASE_URL}${pagePath}`,
        },
      };
    }

    return {
      title: seoCard?.title,
      description: seoCard?.description,
      ...(seoCard?.KeyWords && { keywords: seoCard?.KeyWords }),
      alternates: {
        canonical: `${BASE_URL}${pagePath}`,
      },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      alternates: {
        canonical: `${BASE_URL}${pagePath}`,
      },
    };
  }
}
