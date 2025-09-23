import "../globals.css";
import { ReactNode } from "react";
import { poppins } from "@/fonts";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import MusicBackToTopButtons from "@/components/backToTopButtons";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>
          Griffity Studios | Creative Agency Nepal | Branding, Design &
          Development
        </title>
        <meta
          name="description"
          content="Griffity Studios is a full-service creative agency in Nepal specializing in branding, web design, video production, marketing, and digital experiences."
        />
        <meta
          name="keywords"
          content="branding agency, branding agency Nepal, logo design Nepal, visual identity design, brand strategy Nepal, rebranding agency, branding consultation, Kathmandu branding agency, content marketing Nepal, digital marketing Nepal, marketing campaigns, social media management Nepal, influencer marketing Nepal, content creation Nepal, photography Nepal, videography Nepal, video production Nepal, UI UX design Nepal, web design Nepal, ecommerce Nepal, SEO services Nepal, performance optimization Nepal, website maintenance Nepal, app design Nepal, 3D modeling Nepal, architectural visualization Nepal, AR VR Nepal, event planning Nepal, event marketing Nepal, sponsorship management Nepal, immersive branding Nepal, trend forecasting Nepal, creative agency Nepal, media agency Nepal, workshop training branding, new media research, brand guidelines Nepal, storytelling agency Nepal, product prototyping Nepal, concept design Nepal, digital experience agency Nepal, Kathmandu creative agency"
        />
        <meta name="author" content="Griffity Studios Team" />

        {/* Canonical URL */}
        {/* <link rel="canonical" href="https://www.griffitystudios.com/" /> */}

        {/* Favicons */}
        <link rel="icon" href="/logos/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logos/favicon.svg" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta
          property="og:title"
          content="Griffity Studios | Creative Agency in Nepal"
        />
        <meta
          property="og:description"
          content="From branding and design to development and marketing, Griffity Studios delivers full-scale creative solutions that connect your brand with your audience."
        />
        <meta
          property="og:image"
          content="https://griffitystudios.com/logos/og-cover.jpg"
        />
        <meta property="og:url" content="https://www.griffitystudios.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Griffity Studios" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Griffity Studios | Creative Agency in Nepal"
        />
        <meta
          name="twitter:description"
          content="Your go-to branding and digital agency in Nepal — from visual identity to web, media, marketing, and immersive events."
        />
        <meta
          name="twitter:image"
          content="https://griffitystudios.com/logos/og-cover.jpg"
        />

        {/* Google Analytics + Verification */}
        <GoogleAnalytics gaId="G-ERFLFTBEEK" />
        <meta
          name="google-site-verification"
          content="2GQTx5-n9JcIS0caqD2mItbou8HvUryLzFeRe8Fj9kM"
        />
      </head>

      <body
        className={`bg-body ${poppins.className} text-white transition-all ease-in-out duration-700`}
      >
        <SpeedInsights />
        <Analytics />
        <main>{children}
          <MusicBackToTopButtons/>
        </main>
      </body>
    </html>
  );
}
