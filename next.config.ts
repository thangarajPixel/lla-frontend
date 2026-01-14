import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
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
