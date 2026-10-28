import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.IS_CAP_EXPORT ? 'export' : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
