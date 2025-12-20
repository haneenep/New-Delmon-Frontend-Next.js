import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "palegoldenrod-wombat-569197.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;
