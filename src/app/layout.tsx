import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import { GoogleAnalytics } from "nextjs-google-analytics";

export const metadata: Metadata = {
  title: "aliAljaffer",
  description: "Cloud Engineering and DevOps Portfolio",
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
      suppressHydrationWarning
    >
      <body>{children}</body>
      <GoogleAnalytics trackPageViews gaMeasurementId="G-CWKB4GRTEB" />
    </html>
  );
}
