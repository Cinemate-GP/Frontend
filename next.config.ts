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
    ],
    domains: ['res.cloudinary.com']
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://cinemate.runasp.net/api/:path*", // Proxy API requests
      },
    ];
  },
};

export default nextConfig;
