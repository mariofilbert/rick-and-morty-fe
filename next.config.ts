import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
    minimumCacheTTL: 86400,
    unoptimized: true,
  },
};

export default nextConfig;
