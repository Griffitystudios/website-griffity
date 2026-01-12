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
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-ERFLFTBEEK" />
        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="YZP9Yd1gdOh/bg8OscMkig"
          strategy="afterInteractive"
        />
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
