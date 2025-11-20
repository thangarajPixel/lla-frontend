import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    BASE_URL: process.env.NEXT_APP_BASE_URL,
  },
};

export default nextConfig;
