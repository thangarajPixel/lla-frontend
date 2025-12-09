"use client";

import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { Dummy3 } from "@/helpers/ImageHelper";
import HTMLWidget from "@/components/widgets/HTMLWidget";

interface BlogImage {
  id: number;
  name: string;
  url: string;
}

interface BlogCard {
  id: number;
  Title: string;
  Description: string | null;
  Btn_txt: string;
  Image: BlogImage[] | null;
}

interface BlogData {
  id: number;
  Title: string;
  Description: string;
  BlogCard: BlogCard[];
}

interface BlogPageData {
  Blog: BlogData;
}

const BlogSection = ({ data }: { data: BlogPageData }) => {
  console.log(data);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const blogData = data?.Blog;
  const blogCards = blogData?.BlogCard || [];

  const getImageUrl = (image: BlogImage[] | null): string => {
    if (image && Array.isArray(image) && image.length > 0 && image[0]?.url) {
      return getS3Url(image[0].url);
    }
    return Dummy3.src;
  };

  return (
    <section className="w-full bg-white py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 3xl:py-20">
      <ContainerWidget>
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[80px] font-semibold md:font-normal text-black font-urbanist">
              {blogData?.Title || ""}
            </h3>
            <p className="text-[16px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
              {blogData?.Description ||
                ""}
            </p>
          </div>

          {blogCards.length > 0 && (
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
                      {blogCards.map((blog, index) => {
                        const imageUrl = getImageUrl(blog.Image);
                        const imageAlt =
                          blog.Image?.[0]?.name ||
                          blog.Title ||
                          "Blog post image";

                        return (
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
                                    src={imageUrl}
                                    alt={imageAlt}
                                    width={410}
                                    height={272}
                                    className="object-cover w-full h-auto 3xl:min-w-[410px] 3xl:min-h-[272px] transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <h4 className="font-mulish  3xl:text-[24px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[16px] font-bold text-black leading-tight">
                                    {blog.Title}
                                  </h4>
                                  {blog.Description && (
                                    <HTMLWidget content={blog.Description} className="text-[15px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal line-clamp-2" tag="p" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </ScrollWidget>
                        );
                      })}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  style={{ gap: "20px" }}
                >
                  {blogCards.map((blog, index) => {
                    const imageUrl = getImageUrl(blog.Image);
                    const imageAlt =
                      blog.Image?.[0]?.name || blog.Title || "Blog post image";

                    return (
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
                                src={imageUrl}
                                alt={imageAlt}
                                width={410}
                                height={272}
                                className="object-cover w-full h-auto 3xl:min-w-[410px] 3xl:min-h-[272px] transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <h4 className="font-mulish 3xl:text-[24px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[16px] font-bold text-black leading-tight">
                                {blog.Title}
                              </h4>
                              {blog.Description && (
                                <HTMLWidget 
                                  content={blog.Description}
                                  className="text-[15px] lg:text-[15px] 3xl:text-[18px] font-normal text-black leading-normal line-clamp-2"
                                  tag="p"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </ScrollWidget>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </ContainerWidget>
    </section>
  );
};

export default BlogSection;
