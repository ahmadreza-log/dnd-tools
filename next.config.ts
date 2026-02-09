import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  output: 'export',
  // Exclude API routes from static export
  // API routes are not compatible with static export
  // We use client-side generator functions instead
  trailingSlash: true,
};

export default nextConfig;
