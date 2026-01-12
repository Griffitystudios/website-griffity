import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce Website Questionnaire | Griffity Studios",
  description:
    "Get started with your custom e-commerce website. Fill out our comprehensive questionnaire to help us understand your business needs and create the perfect online store for your brand.",
  keywords: [
    "ecommerce Nepal",
    "online store Nepal",
    "ecommerce website",
    "custom ecommerce",
    "online shopping Nepal",
    "ecommerce development",
    "Griffity Studios ecommerce",
  ],
  authors: [{ name: "Griffity Studios Team" }],
  creator: "Griffity Studios",
  publisher: "Griffity Studios",
  alternates: {
    canonical: "https://www.griffitystudios.com/ecommerce",
  },
  openGraph: {
    title: "E-commerce Website Questionnaire | Griffity Studios",
    description:
      "Get started with your custom e-commerce website. Tell us about your business and we'll create the perfect online store.",
    url: "https://www.griffitystudios.com/ecommerce",
    siteName: "Griffity Studios",
    images: [
      {
        url: "https://www.griffitystudios.com/logos/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Griffity Studios E-commerce Services",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Website Questionnaire | Griffity Studios",
    description:
      "Get started with your custom e-commerce website. Fill out our questionnaire to begin your online store journey.",
    images: ["https://www.griffitystudios.com/logos/og-cover.jpg"],
    creator: "@GriffityStudios",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
