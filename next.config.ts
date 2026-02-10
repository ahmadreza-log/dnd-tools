import type { NextConfig } from "next";

/**
 * Next.js Configuration
 * 
 * This configuration is optimized for GitHub Pages deployment.
 * 
 * Key settings:
 * - output: 'export' - Enables static export for GitHub Pages
 * - basePath: '/dnd-tools' - Required for GitHub Pages when repository name is in URL
 * - images.unoptimized: true - Required for static export (no image optimization server)
 * - trailingSlash: true - Required for GitHub Pages compatibility
 * 
 * GitHub Pages URL format: https://username.github.io/repository-name/
 * The basePath must match the repository name for assets to load correctly.
 * 
 * Important: For local development, access the app at http://localhost:3000/dnd-tools
 * The basePath is required for static export and GitHub Pages deployment.
 * 
 * Note: Next.js automatically handles basePath for Image components, but we set
 * unoptimized: true because static export doesn't support image optimization.
 */
const repositoryName = 'dnd-tools';

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
  // Base path for GitHub Pages deployment
  // This is required when the repository name appears in the URL
  // Example: https://username.github.io/repo-name/
  // The basePath ensures all routes and assets are prefixed correctly
  // This fixes the issue where images don't load on GitHub Pages
  basePath: `/${repositoryName}`,
  // Exclude API routes from static export
  // API routes are not compatible with static export
  // We use client-side generator functions instead
  trailingSlash: true,
  // Image optimization settings for static export
  images: {
    unoptimized: true, // Required for static export (no image optimization server)
  },
  // Environment variables for client-side access
  env: {
    NEXT_PUBLIC_BASE_PATH: `/${repositoryName}`,
  },
};

export default nextConfig;
