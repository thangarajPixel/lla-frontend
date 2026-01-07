"use client";

import gsap from "gsap";
import { X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getBlogPageData } from "@/app/api/server";
import { Skeleton } from "@/components/ui/skeleton";
import ButtonWidget from "@/components/widgets/ButtonWidget";
import ContainerWidget from "@/components/widgets/ContainerWidget";
import HTMLWidget from "@/components/widgets/HTMLWidget";
import ImageWidget from "@/components/widgets/ImageWidget";
import ParagraphWidget from "@/components/widgets/ParagraphWidget";
import ScrollWidget from "@/components/widgets/ScrollWidget";
import { getS3Url } from "@/helpers/ConstantHelper";
import { ArrowDown, ArrowRightWhite, SearchIcon } from "@/helpers/ImageHelper";

interface BlogImage {
  id: number;
  name: string;
  url: string;
}

interface BlogCard {
  id: number;
  Title: string;
  Slug: string;
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
  const [loading, _setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTotal, setSearchTotal] = useState<number | null>(null);
  const total =
    searchTotal !== null
      ? searchTotal
      : data?.pagination?.total || blogCards.length;

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previousLength = useRef(blogCards.length);
  const skeletonIdRef = useRef(0);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSearchingRef = useRef(false);
  const lastSearchQueryRef = useRef<string>("");

  const skeletonKeys = useMemo(() => {
    if (loadingMore) {
      skeletonIdRef.current += 1;
      const baseId = skeletonIdRef.current;
      return Array.from({ length: 6 }, () => {
        const uniqueId = `${baseId}-${Math.random().toString(36).substring(2, 9)}`;
        return `skeleton-${uniqueId}`;
      });
    }
    return [];
  }, [loadingMore]);

  const searchSkeletonKeys = useMemo(() => {
    if (searchLoading) {
      const baseId = `search-${Date.now()}`;
      return Array.from({ length: 6 }, () => {
        const uniqueId = `${baseId}-${Math.random().toString(36).substring(2, 9)}`;
        return `search-skeleton-${uniqueId}`;
      });
    }
    return [];
  }, [searchLoading]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    const trimmedQuery = query.trim();

    if (isSearchingRef.current || lastSearchQueryRef.current === trimmedQuery) {
      return;
    }

    isSearchingRef.current = true;
    lastSearchQueryRef.current = trimmedQuery;
    setSearchLoading(true);
    setPage(1);
    previousLength.current = 0;
    cardsRef.current = [];

    try {
      const params = {
        page: 1,
        per_page: 9,
        ...(trimmedQuery && { search: trimmedQuery }),
      };
      const { data: res } = await getBlogPageData(params);

      if (res?.Blog?.BlogCard) {
        setBlogCards(res.Blog.BlogCard);
        setSearchTotal(res.pagination?.total || res.Blog.BlogCard.length);
        setPage(1);
      } else {
        setBlogCards([]);
        setSearchTotal(0);
        setPage(1);
      }
    } finally {
      setSearchLoading(false);
      isSearchingRef.current = false;
    }
  }, []);

  const clearSearch = useCallback(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    isSearchingRef.current = false;
    lastSearchQueryRef.current = "";
    setSearchTotal(null);
    setPage(1);
    previousLength.current = 0;
    cardsRef.current = [];
    setBlogCards(blogData?.BlogCard || []);
    setLoadingMore(false);
  }, [blogData?.BlogCard]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }

    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === "") {
      if (searchTotal !== null) {
        clearSearch();
      }
      return;
    }

    if (isSearchingRef.current || lastSearchQueryRef.current === trimmedQuery) {
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (
        !isSearchingRef.current &&
        lastSearchQueryRef.current !== trimmedQuery
      ) {
        handleSearch(trimmedQuery);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    };
  }, [searchQuery, clearSearch, handleSearch, searchTotal]);

  const loadMore = async () => {
    if (loading || loadingMore || blogCards.length >= total) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const params = {
        page: nextPage,
        per_page: 9,
        ...(searchQuery.trim() && { search: searchQuery.trim() }),
      };

      const { data: res } = await getBlogPageData(params);

      if (res?.Blog?.BlogCard) {
        setBlogCards((prev) => [...prev, ...res.Blog.BlogCard]);
        setPage(nextPage);
        if (res.pagination?.total !== undefined) {
          if (searchQuery.trim()) {
            setSearchTotal(res.pagination.total);
          } else {
            // Update the original total when not searching
            setSearchTotal(null);
          }
        }
      }
    } catch (error) {
      console.error("Error loading more blogs:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const newItems = cardsRef.current
      .slice(previousLength.current)
      .filter((el): el is HTMLDivElement => el !== null);

    if (newItems.length > 0) {
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
    }

    previousLength.current = blogCards.length;
  }, [blogCards]);

  const getImageUrl = (image: BlogImage[] | null): string => {
    if (image && Array.isArray(image) && image.length > 0 && image[0]?.url) {
      return getS3Url(image[0].url);
    }
    return "";
  };

  return (
    <section className="w-full bg-white py-4 pt-10 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-14 3xl:py-20">
      <ContainerWidget>
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
            <div className="flex flex-col gap-5 md:gap-3 flex-1">
              <h3 className="text-3xl xss:text-[32px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl 3xl:text-[64px] font-semibold md:font-normal text-black font-urbanist">
                {blogData?.Title || ""}
              </h3>
              <ParagraphWidget className="w-full md:max-w-[600px]">
                {blogData?.Description || ""}
              </ParagraphWidget>
            </div>

            <div className="w-full md:w-auto md:min-w-[320px] md:shrink-0">
              <div className="relative md:mt-20">
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <ImageWidget
                    src={SearchIcon}
                    alt="Search"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (searchTimeoutRef.current) {
                        clearTimeout(searchTimeoutRef.current);
                        searchTimeoutRef.current = null;
                      }
                      if (!isSearchingRef.current && searchQuery.trim()) {
                        handleSearch(searchQuery);
                      }
                    }
                  }}
                  className="w-full h-[45px] pl-4 pb-2.5 pr-10 rounded-full border border-[#E97451] bg-background px-3 py-2 text-base placeholder:text-muted-foreground/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#E97451]/50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-sm placeholder:font-urbanist"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      clearSearch();
                    }}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {searchLoading ? (
            <div className="w-full" suppressHydrationWarning>
              <div style={{ margin: "-10px" }}>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{
                    350: 1,
                    640: 2,
                    1024: 3,
                  }}
                >
                  <Masonry gutter="20px">
                    {searchSkeletonKeys.map((key) => (
                      <div key={key} style={{ padding: "10px" }}>
                        <BlogCardSkeleton />
                      </div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            </div>
          ) : blogCards.length > 0 ? (
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
                                  <h4 className="font-mulish text-[24px]  font-semibold text-black leading-[29px]">
                                    {blog.Title}
                                  </h4>
                                  {blog.Description && (
                                    <HTMLWidget
                                      content={blog.Description}
                                      className="text-[16px] lg:text-[16px]  3xl:text-[18px] font-normal text-black leading-normal line-clamp-2"
                                      tag="p"
                                    />
                                  )}
                                    <Link
                                  href={`/blogs/${blog.Slug}`}
                                  className="inline-flex items-center gap-2 text-[#E97451] hover:gap-2 transition-all duration-300  text-[16px] md:text-[16px] lg:text-[16px] font-normal font-urbanist group"
                                >
                                  {blog.Btn_txt}
                                  <ImageWidget
                                    src={ArrowRightWhite}
                                    alt="Arrow Right"
                                    width={15}
                                    height={15}
                                    className="object-contain"
                                  />
                                </Link>
                                </div>
                              
                              </div>
                            </div>
                          </ScrollWidget>
                        );
                      })}

                      {loadingMore &&
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
                                href={`/blogs/${blog.Slug}`}
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

                  {loadingMore &&
                    skeletonKeys.map((key) => (
                      <div key={key}>
                        <BlogCardSkeleton />
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : (
            searchQuery && (
              <div className="w-full flex flex-col items-center justify-center py-12">
                <p className="text-[16px] md:text-[18px] font-normal text-gray-600 text-center">
                  No blogs found matching &quot;{searchQuery}&quot;
                </p>
              </div>
            )
          )}

          {!loading &&
            !searchLoading &&
            !loadingMore &&
            blogCards.length < total && (
              <ScrollWidget animation="fadeIn" delay={0.1}>
                <div className="flex justify-center items-center mt-8">
                  <ButtonWidget
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="h-[50px] w-[172px] font-mulish hover:bg-white font-bold bg-white border border-[#E97451] rounded-[60px] text-[#E97451] px-5 text-xs xl:text-[14px] 2xl:text-[14px] 3xl:text-[18px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? "Loading..." : "Load More"}
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
