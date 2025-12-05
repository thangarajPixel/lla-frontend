"use client";

import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import {
  Dummy1,
  Dummy2,
  Dummy3,
  Dummy4,
  Dummy5,
  Dummy6,
  Dummy7,
  Dummy8,
  Dummy9,
} from "@/helpers/ImageHelper";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const dummyBlogs: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Visual Storytelling",
    description:
      "Explore how photography transcends mere image capture to become a powerful medium for narrative expression.",
    image: Dummy1,
    alt: "Blog post image",
  },
  {
    id: 2,
    title: "Mastering Light and Shadow",
    description:
      "Understanding the fundamental principles of lighting in photography and how it shapes our perception of images.",
    image: Dummy2,
    alt: "Blog post image",
  },
  {
    id: 3,
    title: "Digital Workflow Essentials",
    description:
      "A comprehensive guide to organizing and processing your digital photography workflow for maximum efficiency.",
    image: Dummy3,
    alt: "Blog post image",
  },
  {
    id: 4,
    title: "Portrait Photography Techniques",
    description:
      "Learn the art of capturing compelling portraits that reveal the essence of your subject.",
    image: Dummy4,
    alt: "Blog post image",
  },
  {
    id: 5,
    title: "Landscape Photography Adventures",
    description:
      "Discover the beauty of nature through landscape photography and learn to capture breathtaking vistas.",
    image: Dummy5,
    alt: "Blog post image",
  },
  {
    id: 6,
    title: "Creative Composition Rules",
    description:
      "Breaking down traditional composition rules and exploring creative ways to frame your photographs.",
    image: Dummy6,
    alt: "Blog post image",
  },
  {
    id: 7,
    title: "Color Theory in Photography",
    description:
      "Understanding how color influences mood and meaning in photographic compositions.",
    image: Dummy7,
    alt: "Blog post image",
  },
  {
    id: 8,
    title: "Street Photography Ethics",
    description:
      "Navigating the ethical considerations and best practices in street photography.",
    image: Dummy8,
    alt: "Blog post image",
  },
  {
    id: 9,
    title: "Equipment Guide for Beginners",
    description:
      "Essential photography equipment recommendations for those just starting their journey.",
    image: Dummy9,
    alt: "Blog post image",
  },
];

const BlogSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="w-full bg-white py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 3xl:py-20">
      <ContainerWidget>
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
              Blogs
            </h3>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
              Explore our collection of articles, insights, and stories about
              photography, visual arts, and creative expression.
            </p>
          </div>

          <div className="w-full" suppressHydrationWarning>
            {isMounted ? (
              <div style={{ margin: "-10px" }}>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{
                    350: 1,
                    640: 2,
                    1024: 3,
                  }}
                >
                  <Masonry gutter="20px">
                    {dummyBlogs.map((blog, index) => (
                      <ScrollWidget
                        key={blog.id}
                        animation="fadeUp"
                        delay={index * 0.1}
                        duration={0.6}
                        start="top 85%"
                        once={true}
                      >
                        <div
                          className="relative w-full overflow-hidden group cursor-pointer bg-white"
                          style={{ padding: "10px" }}
                        >
                          <div className="flex flex-col gap-4 h-full">
                            <div className="relative w-full overflow-hidden rounded-none aspect-video">
                              <ImageWidget
                                src={blog.image}
                                alt={blog.alt}
                                width={410}
                                height={272}
                                className="object-cover w-full h-auto 3xl:min-w-[410px] 3xl:min-h-[272px] transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <h4 className="font-mulish 3xl:text-[24px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] font-bold text-black leading-tight">
                                {blog.title}
                              </h4>
                              <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal line-clamp-2">
                                {blog.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </ScrollWidget>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ gap: "20px" }}
              >
                {dummyBlogs.map((blog, index) => (
                  <ScrollWidget
                    key={blog.id}
                    animation="fadeUp"
                    delay={index * 0.1}
                    duration={0.6}
                    start="top 85%"
                    once={true}
                  >
                    <div className="relative w-full overflow-hidden group cursor-pointer bg-white p-3">
                      <div className="flex flex-col gap-4 h-full">
                        <div className="relative w-full overflow-hidden rounded-none aspect-video">
                          <ImageWidget
                            src={blog.image}
                            alt={blog.alt}
                            width={410}
                            height={272}
                            className="object-cover w-full h-auto 3xl:min-w-[410px] 3xl:min-h-[272px] transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h4 className="font-mulish 3xl:text-[24px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[12px] font-bold text-black leading-tight">
                            {blog.title}
                          </h4>
                          <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal line-clamp-2">
                            {blog.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollWidget>
                ))}
              </div>
            )}
          </div>
        </div>
      </ContainerWidget>
    </section>
  );
};

export default BlogSection;
