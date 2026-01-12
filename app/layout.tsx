import "../globals.css";
import { ReactNode } from "react";
import { poppins } from "@/fonts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import MusicBackToTopButtons from "@/components/backToTopButtons";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#081c26",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.griffitystudios.com"),
  icons: {
    icon: "/logos/favicon.svg",
    apple: "/logos/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
       {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        
        {/* DNS Prefetch for faster lookups */}
        <link rel="dns-prefetch" href="https://vercel.live" />
        
        {/* Fallback favicon links for older browsers */}
        <link rel="icon" href="/logos/favicon.ico" sizes="any" />
        <link rel="icon" href="/logos/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logos/apple-touch-icon.png" />
        
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-ERFLFTBEEK" />
        
        {/* Ahrefs Analytics - changed to lazyOnload */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="YZP9Yd1gdOh/bg8OscMkig"
          strategy="lazyOnload"
        />
        
        <meta name="ahrefs-site-verification" content="fcad86c6c0ed508072002e416ac7f8ed168abfa79bacf55b562e3c211aedf216" />
        <meta name="msapplication-TileColor" content="#e87c41" />
        <meta name="theme-color" content="#081c26" />
      </head>

      <body
        className={`bg-body ${poppins.className} text-white transition-all ease-in-out duration-700`}
      >
        <SpeedInsights />
        <Analytics />
        <main>
          {children}
          <MusicBackToTopButtons />
        </main>
      </body>
    </html>
  );
}
