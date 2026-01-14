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
        permanent: true, // 301 redirect
      },
      {
        source: '/photography-contest/shoot-from-home-2020',
        destination: '/life-at-lla',
        permanent: true, // 301 redirect
      },
      {
        source: '/photography-contest/ode-to-water-world-photography-day-2019',
        destination: '/life-at-lla',
        permanent: true, // 301 redirect
      },
      {
        source: '/gallery/lla-campus',
        destination: '/gallery',
        permanent: true, // 301 redirect
      },
      {
        source: '/gallery/nilgiris',
        destination: '/nilgiris',
        permanent: true, // 301 redirect
      },
      {
        source: '/photography-contest',
        destination: '/life-at-lla',
        permanent: true, // 301 redirect
      },
      {
        source: '/courses/pg-diploma-in-professional-photography-digital-production-2025',
        destination: '/courses/pg-diploma-in-professional-photography-videography',
        permanent: true, // 301 redirect
      },
      {
        source: '/courses/pg-diploma-in-documentary-corporate-filmmaking-2025',
        destination: '/',
        permanent: true, // 301 redirect
      },
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
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    ],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
