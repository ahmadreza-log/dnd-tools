import type { NextConfig } from "next";

/**
 * Next.js Configuration
 * 
 * This configuration is optimized for GitHub Pages deployment.
 * 
 * Key settings:
 * - output: 'export' - Enables static export for GitHub Pages
 * - basePath: '/dnd-tools' - Required for GitHub Pages when repository name is in URL
 * - assetPrefix: '/dnd-tools' - Ensures images and assets load correctly
 * - trailingSlash: true - Required for GitHub Pages compatibility
 * 
 * GitHub Pages URL format: https://username.github.io/repository-name/
 * The basePath must match the repository name for assets to load correctly.
 * 
 * Important: For local development, access the app at http://localhost:3000/dnd-tools
 * The basePath is required for static export and GitHub Pages deployment.
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
  // Asset prefix ensures images and static assets load correctly
  // Must match basePath for GitHub Pages
  // This is critical for images to load correctly on GitHub Pages
  assetPrefix: `/${repositoryName}`,
  // Exclude API routes from static export
  // API routes are not compatible with static export
  // We use client-side generator functions instead
  trailingSlash: true,
};

export default nextConfig;
