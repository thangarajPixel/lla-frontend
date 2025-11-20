import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    BASE_URL: process.env.NEXT_APP_BASE_URL,
  },
  // Ensure consistent routing - prevents 404 issues
  trailingSlash: false,
};

export default nextConfig;
