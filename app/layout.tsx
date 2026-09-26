import { sitePath, siteUrl } from "@/lib/urls";
import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/site";
import "./globals.css";
const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = "UAT Pocket — Capture, Fix and Verify UAT Defects";
const description =
  "Capture UAT defects with photo and voice evidence, review structured drafts, coordinate vendor fixes, and verify every result through retest and closure.";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: title, template: "%s | UAT Pocket" },
  description,
  alternates: { canonical: siteUrl("/") },
  icons: { icon: sitePath("/icon.png"), apple: sitePath("/icon.png") },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl("/"),
    siteName: "UAT Pocket",
    images: [
      {
        url: siteUrl("/og.png"),
        width: 1200,
        height: 630,
        alt: "UAT Pocket — Capture clearly. Fix confidently. Verify before closing.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteUrl("/og.png")],
  },
  robots: process.env.NEXT_PUBLIC_SITE_URL
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "UAT Pocket",
              applicationCategory: "BusinessApplication",
              description,
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
