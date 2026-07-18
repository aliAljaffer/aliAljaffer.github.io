import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_URL } from "@/lib/site";
import { contactData } from "@/data/profile";

const title = "Ali Aljaffer - Platform Engineer";
const description = "Cloud Engineering and DevOps Portfolio";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ali Aljaffer",
      jobTitle: "Platform Engineer",
      url: SITE_URL,
      sameAs: contactData
        .filter((c) => c.label !== "Resume")
        .map((c) => c.value),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: title,
      description,
      author: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": `${SITE_URL}/rss.xml` },
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const Roboto = Roboto_Mono({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultLang = "en";
  return (
    <html
      lang={defaultLang}
      className={Roboto.className}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s===null&&p))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-neutral-50 dark:bg-neutral-900">{children}</body>
      <GoogleAnalytics gaId="G-CWKB4GRTEB" />
    </html>
  );
}
