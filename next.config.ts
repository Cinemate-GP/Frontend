import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "http",
        hostname: "cinemate.runasp.net",
      },
      {
        protocol: "https",
        hostname: "cinemate.runasp.net",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cinemate.runasp.net/api/:path*", // Proxy API requests
      },
    ];
  },
};

export default nextConfig;
