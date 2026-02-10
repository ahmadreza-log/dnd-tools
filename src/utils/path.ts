/**
 * Path Utilities
 * 
 * Helper functions for handling paths in Next.js static export with basePath.
 * This ensures that paths work correctly both in development and on GitHub Pages.
 */

/**
 * Get the base path for the application
 * 
 * In production (GitHub Pages), this will be '/dnd-tools'
 * In development, this can be empty or '/dnd-tools' depending on basePath config
 * 
 * @returns {string} The base path prefix
 */
export function getBasePath(): string {
  // Get basePath from environment variable (set in next.config.ts)
  // This is available at build time and runtime
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

/**
 * Get an asset path with basePath prefix
 * 
 * This function ensures that asset paths work correctly on GitHub Pages
 * by adding the basePath prefix when needed.
 * 
 * @param path - The asset path (e.g., '/logo.png')
 * @returns {string} The path with basePath prefix if needed
 * 
 * @example
 * getAssetPath('/logo.png') // Returns: '/dnd-tools/logo.png' in production
 */
export function getAssetPath(path: string): string {
  const basePath = getBasePath();
  // If basePath is empty, return path as is
  if (!basePath) {
    return path;
  }
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Combine basePath and path
  return `${basePath}/${cleanPath}`;
}

