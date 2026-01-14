import type { Metadata } from "next";
import { getBlogPageData } from "@/app/api/server";
import BlogSection from "@/components/sections/more/blog/BlogSection";
import { generateSeoMetadata } from "@/helpers/SeoHelper";

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("/blog");
}

const Blogs = async () => {
  const params = { page: 1, per_page: 9 };
  const { data: response } = await getBlogPageData(params);
  if (response) return <BlogSection data={response} />;
};

export default Blogs;
