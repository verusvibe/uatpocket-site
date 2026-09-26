import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/urls";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!process.env.NEXT_PUBLIC_SITE_URL) return [];
  return ["/", "/product/", "/privacy/", "/support/"].map((path) => ({
    url: siteUrl(path),
  }));
}
