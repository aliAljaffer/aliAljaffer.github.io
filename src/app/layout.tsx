import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import Script from "next/script";

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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id='G-CWKB4GRTEB'`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CWKB4GRTEB');
          `}
      </Script>
    </html>
  );
}
