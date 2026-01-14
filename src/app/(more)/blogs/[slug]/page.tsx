import type { Metadata } from "next";
import { getBlogBySlug } from "@/app/api/server";
import BlogDetailSection from "@/components/sections/more/blogs/BlogDetailSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { data: response } = await getBlogBySlug(slug);
    const baseUrl = (process.env.NEXT_APP_SITE_URL || "https://llacademy.org").replace(/"/g, "");

    return {
      title: response?.card?.SeoViewCard?.Title || "Blog | LLA",
      description: response?.card?.SeoViewCard?.Description || "Light & Life Academy Blog",
      keywords: response?.card?.SeoViewCard?.KeyWords || undefined,
      alternates: {
        canonical: `${baseUrl}/blogs/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating blog metadata:", error);
    const { slug } = await params;
    const baseUrl = (process.env.NEXT_APP_SITE_URL || "https://llacademy.org").replace(/"/g, "");
    return {
      title: "Blog | LLA",
      description: "Light & Life Academy Blog",
      alternates: {
        canonical: `${baseUrl}/blogs/${slug}`,
      },
    };
  }
}

const BlogDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { data: response } = await getBlogBySlug(slug);
  return <BlogDetailSection data={response} />;
};

export default BlogDetail;
