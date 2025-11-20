import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    BASE_URL: process.env.NEXT_APP_BASE_URL,
    S3_URL: process.env.NEXT_APP_S3_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '8000',
      },
      {
        protocol: 'https',
        hostname: 'g037qgw3-8001.inc1.devtunnels.ms',
      },
    ],
  },
};

export default nextConfig;
