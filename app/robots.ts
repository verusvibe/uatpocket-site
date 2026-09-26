import type { MetadataRoute } from "next";
import { siteUrl, sitePath } from "@/lib/urls";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const configured = Boolean(process.env.NEXT_PUBLIC_SITE_URL);
  return {
    rules: {
      userAgent: "*",
      ...(configured ? { allow: sitePath("/") } : { disallow: "/" }),
    },
    ...(configured ? { sitemap: siteUrl("/sitemap.xml") } : {}),
  };
}
