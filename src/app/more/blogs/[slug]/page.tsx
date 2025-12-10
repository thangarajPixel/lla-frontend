import { getBlogBySlug } from "@/app/api/server";
import BlogDetailSection from "@/components/sections/more/blogs/BlogDetailSection";


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