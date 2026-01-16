import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/faqs',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/photography-contest/shoot-from-home-2020',
        destination: '/life-at-lla',
        permanent: true,
      },
      {
        source: '/photography-contest/ode-to-water-world-photography-day-2019',
        destination: '/life-at-lla',
        permanent: true,
      },
      {
        source: '/gallery/lla-campus',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/gallery/alumni-gallery',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/gallery/nilgiris',
        destination: '/nilgiris',
        permanent: true,
      },
      {
        source: '/photography-contest',
        destination: '/life-at-lla',
        permanent: true,
      },
      {
        source: '/courses/pg-diploma-in-professional-photography-digital-production-2025',
        destination: '/',
        permanent: true,
      },
      {
        source: '/courses/pg-diploma-in-documentary-corporate-filmmaking-2025',
        destination: '/',
        permanent: true,
      },
      {
        source: '/in-the-media/light-life-academy-in-association-with-rotary-international-presents-ode-to-trees-an-online-photography-contest-on-instagram',
        destination: '/in-the-media/lla-in-association-with-rotary-international-presents-ode-to-trees-an-online-photography-contest-on-instagram',
        permanent: true,
      },
      {
        source: '/in-the-media/a-song-for-water-an-innovative-effort-to-present-the-world-photo-day',
        destination: '/in-the-media/a-song-for-water-an-innovative-effort-to-present-the-world-photography-day',
        permanent: true,
      },
      {
        source: '/in-the-media/world-photography-day-exhibition-on-importance-of-water',
        destination: '/in-the-media/photographic-exhibition-focused-on-the-importance-of-water',
        permanent: true,
      },
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/courses',
        destination: '/',
        permanent: true,
      }
    ];
  },
  
  env: {
    BASE_URL: process.env.NEXT_APP_BASE_URL,
    S3_URL: process.env.NEXT_APP_S3_URL,
    NEXT_APP_SITE_URL: process.env.NEXT_APP_SITE_URL,
  },
  
  images: {
    unoptimized: false, // Enable image optimization
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 75, 85, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "8000",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_APP_S3_URL || "",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
