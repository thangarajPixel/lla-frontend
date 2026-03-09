import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ✅ Enforce HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },

          // ✅ Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },

          // ✅ Prevent MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          // ✅ Control referrer info
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          // ✅ Disable unused browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },

          // ✅ Basic CSP (safe for Next.js + images)
          {
            key: "Content-Security-Policy",
            value: ` 
              default-src 'self';
              img-src 'self' https: data: blob:
              https://www.google-analytics.com
              https://www.googletagmanager.com
              https://connect.facebook.net
              https://*.clarity.ms;

              script-src 
              'self' 'unsafe-inline' 'unsafe-eval'
              https://www.googletagmanager.com
              https://www.google-analytics.com
              https://connect.facebook.net
              https://www.google.com
              https://www.gstatic.com
              https://plausible.io
              https://www.clarity.ms
              https://*.clarity.ms
              https://*.contentsquare.net;

              script-src-elem
              'self' 'unsafe-inline' 'unsafe-eval'
              https://www.googletagmanager.com
              https://www.google-analytics.com
              https://connect.facebook.net
              https://www.google.com
              https://www.gstatic.com
              https://googleads.g.doubleclick.net
              https://plausible.io
              https://www.clarity.ms
              https://*.clarity.ms
              https://*.contentsquare.net;

              style-src 'self' 'unsafe-inline';
              font-src 'self' https: data:;

              connect-src 'self' https:
              https://www.google-analytics.com
              https://www.googletagmanager.com
              https://www.facebook.com
              https://www.google.com
              https://www.clarity.ms
              https://*.clarity.ms
              https://*.contentsquare.net
              https://dev-admin.lightandlifeacademy.in
              https://dev.lightandlifeacademy.in
              https://llaacademy-frontend.conefy.com
              https://llaacademy-backend.conefy.com
              https://llacademy.org
              https://plausible.io
              http://localhost:3030;

              frame-src 'self' https:
              https://www.google-analytics.com
              https://www.googletagmanager.com
              https://www.facebook.com;
              
              frame-ancestors 'self';
              media-src 'self' https://*.lightandlifeacademy.in https://llaacademy-backend.conefy.com;`
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/faqs",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/courses",
        destination: "/#course",
        permanent: true,
      },
      {
        source: "/photography-contest/shoot-from-home-2020",
        destination: "/life-at-lla",
        permanent: true,
      },
      {
        source: "/photography-contest/ode-to-water-world-photography-day-2019",
        destination: "/life-at-lla",
        permanent: true,
      },
      {
        source: "/gallery/lla-campus",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/gallery/alumni-gallery",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/gallery/nilgiris",
        destination: "/nilgiris",
        permanent: true,
      },
      {
        source: "/photography-contest",
        destination: "/life-at-lla",
        permanent: true,
      },
      {
        source:
          "/courses/pg-diploma-in-professional-photography-digital-production-2025",
        destination:
          "/courses/pg-diploma-in-professional-photography-videography",
        permanent: true,
      },
      {
        source: "/courses/pg-diploma-in-documentary-corporate-filmmaking-2025",
        destination: "/#course",
        permanent: true,
      },
      {
        source:
          "/in-the-media/light-life-academy-in-association-with-rotary-international-presents-ode-to-trees-an-online-photography-contest-on-instagram",
        destination:
          "/in-the-media/lla-in-association-with-rotary-international-presents-ode-to-trees-an-online-photography-contest-on-instagram",
        permanent: true,
      },
      {
        source:
          "/in-the-media/a-song-for-water-an-innovative-effort-to-present-the-world-photo-day",
        destination:
          "/in-the-media/a-song-for-water-an-innovative-effort-to-present-the-world-photography-day",
        permanent: true,
      },
      {
        source:
          "/in-the-media/world-photography-day-exhibition-on-importance-of-water",
        destination:
          "/in-the-media/photographic-exhibition-focused-on-the-importance-of-water",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
    ];
  },

  env: {
    BASE_URL: process.env.NEXT_APP_BASE_URL,
    S3_URL: process.env.NEXT_APP_S3_URL,
    NEXT_APP_SITE_URL: process.env.NEXT_APP_SITE_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },

  images: {
    unoptimized: false, // Enable image optimization
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 70, 75, 85, 96, 128, 256, 384],
    qualities: [75, 85, 100],
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
      {
        protocol: "https",
        hostname: "player.vimeo.com",
      },
    ],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default nextConfig;
