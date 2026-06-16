import type { Metadata } from "next";
import { HiHome } from "react-icons/hi";
import Link from "next/link";

import ArticleItemList from "@/components/article-item-list";
import type { ArticleItem } from "@/types";
import { getSortedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog | Tech Insights & Tutorials | Griffity Studios",
  description:
    "Latest insights, tutorials, and best practices in web development, branding, design, and technology from Griffity Studios.",
  keywords: [
    "blog",
    "web development",
    "branding insights",
    "design tutorials",
    "React",
    "Next.js",
    "TypeScript",
    "UI/UX design",
    "digital marketing",
    "Nepal tech blog",
    "Griffity Studios blog",
  ],
  authors: [{ name: "Griffity Studios Team" }],
  creator: "Griffity Studios",
  publisher: "Griffity Studios",
  alternates: {
    canonical: "https://www.griffitystudios.com/blogs",
  },
  openGraph: {
    title: "Blog | Tech Insights & Tutorials | Griffity Studios",
    description:
      "Explore expert articles on web development, branding, design, and technology from Griffity Studios.",
    url: "https://www.griffitystudios.com/blogs",
    siteName: "Griffity Studios",
    images: [
      {
        url: "https://www.griffitystudios.com/logos/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Griffity Studios Blog - Latest Articles",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Tech Insights & Tutorials | Griffity Studios",
    description:
      "Expert insights on web development, branding, design, and technology from Griffity Studios.",
    images: ["https://www.griffitystudios.com/logos/og-cover.jpg"],
    creator: "@GriffityStudios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function BlogPage() {
  const articles = getSortedArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://www.griffitystudios.com/blogs/#blog",
    name: "Griffity Studios Blog - Tech Insights & Tutorials",
    description:
      "A blog featuring the latest insights, tutorials, and best practices in web development, branding, design, and technology from Griffity Studios.",
    url: "https://www.griffitystudios.com/blogs",
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      "@id": "https://www.griffitystudios.com/#organization",
      name: "Griffity Studios",
      logo: {
        "@type": "ImageObject",
        url: "https://www.griffitystudios.com/logos/logo.png",
      },
    },
    blogPost: articles.slice(0, 10).map((article: ArticleItem) => ({
      "@type": "BlogPosting",
      "@id": `https://www.griffitystudios.com/blogs/${article.slug || article.id}#blogpost`,
      headline: article.title,
      description: article.excerpt,
      url: `https://www.griffitystudios.com/blogs/${article.slug || article.id}`,
      datePublished: article.publishedAt,
      author: {
        "@type": "Person",
        name: article.author,
      },
      publisher: {
        "@type": "Organization",
        name: "Griffity Studios",
      },
      keywords: Array.isArray(article.tags)
        ? article.tags.join(", ")
        : "",
      image:
        article.imageUrl ||
        "https://www.griffitystudios.com/logos/logo.png",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen" style={{ backgroundColor: "#051016" }}>
        {/* Back to Home */}
        <div className="fixed top-8 left-8 z-50">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 hover:border-amber-500/50 text-slate-300 hover:text-white font-poppins font-medium rounded-lg transition-all duration-300"
          >
            <HiHome className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-sm">Home</span>
          </Link>
        </div>

        {/* Hero */}
        <header className="relative overflow-hidden pt-24 pb-16 lg:pb-20">
          <div className="absolute inset-0 opacity-[0.02]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="code-pattern"
                  width="200"
                  height="200"
                  patternUnits="userSpaceOnUse"
                >
                  <text x="10" y="20" fill="rgb(148 163 184)" fontSize="12" fontFamily="monospace">&lt;/&gt;</text>
                  <text x="60" y="50" fill="rgb(148 163 184)" fontSize="10" fontFamily="monospace">const</text>
                  <text x="120" y="80" fill="rgb(148 163 184)" fontSize="12" fontFamily="monospace">{}</text>
                  <text x="30" y="110" fill="rgb(148 163 184)" fontSize="10" fontFamily="monospace">function</text>
                  <text x="100" y="140" fill="rgb(148 163 184)" fontSize="12" fontFamily="monospace">[ ]</text>
                  <text x="160" y="170" fill="rgb(148 163 184)" fontSize="10" fontFamily="monospace">=&gt;</text>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#code-pattern)" />
            </svg>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051016]/50 to-[#051016]" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950/10 via-transparent to-blue-950/10" />

          <div className="relative max-w-5xl mx-auto px-4 text-center space-y-5">
            <h1 className="font-cormorantGaramond text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Insights & Tutorials
            </h1>

            <p className="font-poppins text-base lg:text-lg text-slate-400 max-w-2xl mx-auto">
              Articles on web development, design, and technology from industry experts
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm font-poppins">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-white font-semibold">
                  {articles.length}+
                </span>
                <span>Articles</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-600" />
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-white font-semibold">Weekly</span>
                <span>Updates</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block" />
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-white font-semibold">Expert</span>
                <span>Authors</span>
              </div>
            </div>
          </div>
        </header>

        {/* Articles */}
        <main className="max-w-7xl mx-auto px-4 pb-24 pt-12">
          <ArticleItemList articles={articles} />
        </main>
      </div>
    </>
  );
}
