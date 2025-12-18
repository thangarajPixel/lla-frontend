import { getBlogPageData } from "@/app/api/server";
import BlogSection from "@/components/sections/more/blogs/BlogSection";

const Blogs = async () => {
  const params = { page: 1, per_page: 6 };
  const { data: response } = await getBlogPageData(params);
  if (response) return <BlogSection data={response} />;
};

export default Blogs;
