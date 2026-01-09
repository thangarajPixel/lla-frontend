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
  "/about-us": "About-Us",
  "/life-at-lla": "Life-At-Lla",
  "/blogs": "Blog",
  "/contact-us": "Contact-Us",
  "/faq": "Faq",
  "/terms-and-conditions": "Terms-And-Condition",
  "/privacy-policy": "Privacy-Policy",
  "/admission": "Admission",
};

export async function generateSeoMetadata(
  pagePath: string,
): Promise<Metadata> {
  try {
    const { data } = await getSeoData();
    const seoData = data as SeoData;

    const pageName = pageMapping[pagePath];
    if (!pageName) {
      return {};
    }

    const seoCard = seoData?.SeoCard?.find((card) => card.page === pageName);

    if (!seoCard) {
      return {};
    }

    return {
      title: seoCard.title,
      description: seoCard.description,
      ...(seoCard.KeyWords && { keywords: seoCard.KeyWords }),
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {};
  }
}
