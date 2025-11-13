/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  env:{
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
