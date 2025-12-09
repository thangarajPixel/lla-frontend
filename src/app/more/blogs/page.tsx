import { getBlogPageData } from "@/app/api/server";
import BlogSection from "@/components/sections/more/blogs/BlogSection";

const Blogs = async () => {
  const [{ data: response }] = await Promise.all([getBlogPageData()]);
  if (response) return <BlogSection data={response} />;
};

export default Blogs;
