/**
 * Helper to ensure assets load correctly on both localhost and subpath hosting (like GitHub Pages)
 */
export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanBase + cleanPath;
}
