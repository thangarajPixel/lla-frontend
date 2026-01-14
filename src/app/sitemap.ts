import type { MetadataRoute } from "next";
import {
  getCoursesListData,
  getBlogPageData,
  getMediaPageData,
  getLifePageData,
} from "./api/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_APP_SITE_URL || "https://llacademy.org";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/campus`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/life-at-lla`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/admission`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic pages - Courses
  let coursePages: MetadataRoute.Sitemap = [];
  try {
    const { data: coursesData } = await getCoursesListData();
    if (coursesData?.Courses) {
      coursePages = coursesData.Courses.map((course: any) => ({
        url: `${baseUrl}/courses/${course.Slug}`,
        lastModified: new Date(course.updatedAt || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Error fetching courses for sitemap:", error);
  }

  // Dynamic pages - Blogs
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { data: blogsData } = await getBlogPageData({ page: 1, per_page: 100 });
    if (blogsData?.data) {
      blogPages = blogsData.data.map((blog: any) => ({
        url: `${baseUrl}/blogs/${blog.Slug}`,
        lastModified: new Date(blog.updatedAt || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  // Dynamic pages - Media
  let mediaPages: MetadataRoute.Sitemap = [];
  try {
    const { data: mediaData } = await getMediaPageData({ page: 1, per_page: 100 });
    if (mediaData?.data) {
      mediaPages = mediaData.data.map((media: any) => ({
        url: `${baseUrl}/media/${media.Slug}`,
        lastModified: new Date(media.updatedAt || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching media for sitemap:", error);
  }

  // Dynamic pages - Life at LLA
  let lifePages: MetadataRoute.Sitemap = [];
  try {
    const { data: lifeData } = await getLifePageData({ page: 1, per_page: 100 });
    if (lifeData?.data) {
      lifePages = lifeData.data.map((life: any) => ({
        url: `${baseUrl}/life-at-lla/${life.Slug}`,
        lastModified: new Date(life.updatedAt || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching life-at-lla for sitemap:", error);
  }

  return [...staticPages, ...coursePages, ...blogPages, ...mediaPages, ...lifePages];
}

