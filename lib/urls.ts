/** Public paths must include the GitHub Pages repository prefix at build time. */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/$/,
  "",
);
export function sitePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (basePath && (path === basePath || path.startsWith(`${basePath}/`)))
    return path;
  const normalized = path.replace(
    /^\/(product|privacy|support)(?=[?#]|$)/,
    "/$1/",
  );
  return `${basePath}${normalized}`;
}
export function siteUrl(path: string): string {
  return new URL(
    sitePath(path),
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ).href;
}
