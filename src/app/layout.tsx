import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import brand from "@/brand/brand.json";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import Script from "next/script";
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
        .filter((c) => c.label !== "Resume" && c.label !== "Docs")
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brand.light.paper },
    { media: "(prefers-color-scheme: dark)", color: brand.night.paper },
  ],
};

const TextFont = localFont({
  src: [
    { path: "../brand/fonts/Karla.woff2", style: "normal", weight: "200 800" },
    { path: "../brand/fonts/Karla-Italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-text",
  display: "swap",
});

const MonoFont = localFont({
  src: "../brand/fonts/SplineSansMono.woff2",
  weight: "300 700",
  variable: "--font-mono",
  display: "swap",
});

const DisplayFont = localFont({
  src: "../brand/fonts/Fraunces.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
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
      className={`${TextFont.variable} ${MonoFont.variable} ${DisplayFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://umami.alialjaffer.com" />
        <link rel="preconnect" href="https://assets.alialjaffer.com" />
        <link rel="dns-prefetch" href="https://giscus.app" />
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
      <body className="bg-page">
        {children}
        <Script
          strategy="afterInteractive"
          src="https://umami.alialjaffer.com/assets/web.js"
          data-host-url="https://umami.alialjaffer.com"
          data-website-id="ea36b581-4b7d-4c81-9691-3182bfd8dfc8"
        />
      </body>
      <GoogleAnalytics gaId="G-CWKB4GRTEB" />
    </html>
  );
}
