import "../globals.css";
import { ReactNode } from "react";
import { poppins } from "@/fonts";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Griffity Studios | Creative Digital Solutions</title>
        <meta
          name="description"
          content="Griffity Studios crafts immersive digital experiences, offering creative solutions in design, development, and branding."
        />
        <meta
          name="keywords"
          content="Griffity Studios, creative studio, digital design, web development, branding, Nepal tech studio"
        />
        <meta name="author" content="Griffity Studios Team" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://griffitystudios.com/" />

        {/* Favicons */}
        <link rel="icon" href="/logos/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logos/favicon.svg" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Griffity Studios" />
        <meta
          property="og:description"
          content="Creative digital solutions for your brand—web, design, and more."
        />
        <meta
          property="og:image"
          content="https://griffitystudios.com/logos/og-cover.jpg"
        />
        <meta property="og:url" content="https://griffitystudios.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Griffity Studios" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Griffity Studios" />
        <meta
          name="twitter:description"
          content="Creative digital solutions for your brand—web, design, and more."
        />
        <meta
          name="twitter:image"
          content="https://griffitystudios.com/logos/og-cover.jpg"
        />
        <GoogleAnalytics gaId="G-ERFLFTBEEK" />
          
      </head>

      <body
        className={`bg-body ${poppins.className} text-white transition-all ease-in-out duration-700`}
      >
        <SpeedInsights/>
            <Analytics />
        <main>{children}</main>
      </body>
    </html>
  );
}
