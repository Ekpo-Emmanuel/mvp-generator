import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Lint runs separately through `npm run lint`.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
