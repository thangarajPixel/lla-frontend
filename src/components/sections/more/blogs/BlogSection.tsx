"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getBlogPageData } from "@/app/api/server";
import { Skeleton } from "@/components/ui/skeleton";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { ArrowDown, ArrowRightWhite } from "@/helpers/ImageHelper";

interface BlogImage {
  id: number;
  name: string;
  url: string;
}

interface BlogCard {
  id: number;
  Title: string;
  Slug: string;
  ImageUrl: string;
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
  pagination?: {
    total: number;
    page: number;
    per_page: number;
  };
}

const BlogSection = ({ data }: { data: BlogPageData }) => {
  const BlogCardSkeleton = () => (
    <div className="w-full flex flex-col gap-3 bg-white p-3">
      <Skeleton className="w-full h-[200px] md:h-[220px] lg:h-[230px]" />
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-1/2 h-4" />
    </div>
  );

  const [isMounted, setIsMounted] = useState(false);
  const blogData = data?.Blog;
  const [blogCards, setBlogCards] = useState(blogData?.BlogCard || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const total = data?.pagination?.total || blogCards.length;

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previousLength = useRef(blogCards.length);
  const skeletonIdRef = useRef(0);

  const skeletonKeys = useMemo(() => {
    if (loading) {
      skeletonIdRef.current += 1;
      const baseId = skeletonIdRef.current;
      return Array.from({ length: 6 }, () => {
        const uniqueId = `${baseId}-${Math.random().toString(36).substring(2, 9)}`;
        return `skeleton-${uniqueId}`;
      });
    }
    return [];
  }, [loading]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const loadMore = async () => {
    if (loading || blogCards.length >= total) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));

    const nextPage = page + 1;
    const params = { page: nextPage, per_page: 9 };
    const { data: res } = await getBlogPageData(params);
    
    if (res?.Blog?.BlogCard) {
      setBlogCards((prev) => [...prev, ...res.Blog.BlogCard]);
      setPage(nextPage);
    }
    setLoading(false);
  };

  useEffect(() => {
    const newItems = cardsRef.current.slice(previousLength.current);
    gsap.fromTo(
      newItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      },
    );

    previousLength.current = blogCards.length;
  }, [blogCards]);

  const getImageUrl = (image: BlogImage[] | null): string => {
    if (image && Array.isArray(image) && image.length > 0 && image[0]?.url) {
      return getS3Url(image[0].url);
    }
    return "";
  };

  return (
    <section className="w-full bg-white py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 3xl:py-20">
      <ContainerWidget>
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[64px] font-semibold md:font-normal text-black font-urbanist">
              {blogData?.Title || ""}
            </h3>
            <p className="text-[16px] md:text-[17px] 3xl:text-[18px] font-normal text-black leading-normal w-full md:max-w-[600px]">
              {blogData?.Description || ""}
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
                        const imageUrl =
                          blog.ImageUrl || getImageUrl(blog.Image);
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
                              ref={(el) => {
                                cardsRef.current[index] = el;
                              }}
                            >
                              <div className="flex flex-col gap-4 h-full">
                                <div className="relative w-full overflow-hidden rounded-none aspect-video">
                                  {imageUrl && (
                                    <ImageWidget
                                      src={imageUrl}
                                      alt={imageAlt}
                                      width={410}
                                      height={272}
                                      className="object-cover w-full h-auto 3xl:min-w-[410px] 3xl:min-h-[272px] transition-transform duration-300 group-hover:scale-105"
                                      loading="lazy"
                                    />
                                  )}
                                </div>
                                <div className="flex flex-col gap-2">
                                  <h4 className="font-mulish  3xl:text-[24px] 2xl:text-[20px] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[16px] font-bold text-black leading-tight">
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
                                <Link
                                  href={`/more/blogs/${blog.Slug}`}
                                  className="inline-flex items-center gap-2 text-[#E97451] hover:gap-4 transition-all duration-300 mt-2 text-[16px] md:text-[16px] lg:text-[16px] font-normal font-urbanist group"
                                >
                                  {blog.Btn_txt}
                                  <ImageWidget
                                    src={ArrowRightWhite}
                                    alt="Arrow Right"
                                    width={16}
                                    height={16}
                                    className="object-contain"
                                  />
                                </Link>
                              </div>
                            </div>
                          </ScrollWidget>
                        );
                      })}

                      {loading &&
                        skeletonKeys.map((key) => (
                          <div key={key}>
                            <BlogCardSkeleton />
                          </div>
                        ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  style={{ gap: "20px" }}
                >
                  {blogCards.map((blog, index) => {
                    const imageUrl = blog.ImageUrl || getImageUrl(blog.Image);
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
                        <div 
                          className="relative w-full overflow-hidden group cursor-pointer bg-white p-3"
                          ref={(el) => {
                            cardsRef.current[index] = el;
                          }}
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
                              <Link
                                href={`/more/blogs/${blog.Slug}`}
                                className="inline-flex items-center gap-2 text-[#E97451] hover:gap-4 transition-all duration-300 mt-2 text-[16px] md:text-[16px] lg:text-[16px] font-normal font-urbanist group"
                              >
                                Read More
                                <ImageWidget
                                  src={ArrowRightWhite}
                                  alt="Arrow Right"
                                  width={16}
                                  height={16}
                                  className="object-contain"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </ScrollWidget>
                    );
                  })}

                  {loading &&
                    skeletonKeys.map((key) => (
                      <div key={key}>
                        <BlogCardSkeleton />
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {!loading && blogCards.length < total && (
            <ScrollWidget animation="fadeIn" delay={0.1}>
              <div className="flex justify-center items-center mt-8">
                <ButtonWidget
                  onClick={loadMore}
                  className="h-[50px] w-[172px] font-mulish hover:bg-white font-bold bg-white border border-[#E97451] rounded-[60px] text-[#E97451] px-5 text-xs xl:text-[14px] 2xl:text-[14px] 3xl:text-[18px]"
                >
                  Load More
                  <ImageWidget
                    src={ArrowDown}
                    alt="Arrow Down"
                    height={24}
                    width={24}
                    className="object-cover"
                  />
                </ButtonWidget>
              </div>
            </ScrollWidget>
          )}
        </div>
      </ContainerWidget>
    </section>
  );
};

export default BlogSection;
