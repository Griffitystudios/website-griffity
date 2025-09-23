import type { Metadata } from "next";
import { HiBookOpen, HiHome, HiTrendingUp, HiUsers } from "react-icons/hi";

import ArticleItemList from "@/components/article-item-list";
import type { ArticleItem, BlogCategory } from "@/types";
import { getSortedArticles } from "@/lib/articles";
import Link from "next/link";

// Group articles by category
function getCategories(articles: ArticleItem[]): BlogCategory[] {
  const categoryMap: { [key: string]: ArticleItem[] } = {};
  articles.forEach((article) => {
    if (Array.isArray(article.tags)) {
      article.tags.forEach((tag) => {
        if (!categoryMap[tag]) categoryMap[tag] = [];
        categoryMap[tag].push(article);
      });
    }
  });
  return Object.entries(categoryMap).map(([name, articles]) => ({
    name,
    articles,
  }));
}

export const metadata: Metadata = {
  title: "Blog | Tech Insights & Tutorials",
  description:
    "Discover the latest insights, tutorials, and best practices in web development, programming, and technology. Stay updated with expert articles on React, Next.js, TypeScript, and more.",
  keywords: [
    "blog",
    "web development",
    "programming",
    "React",
    "Next.js",
    "TypeScript",
    "tutorials",
    "tech insights",
  ],
  authors: [{ name: "Tech Blog Team" }],
  creator: "Tech Blog",
  publisher: "Tech Blog",
  alternates: {
    canonical: "https://griffitystudios.com/blogs",
  },
  openGraph: {
    title: "Blog | Tech Insights & Tutorials",
    description:
      "Discover the latest insights, tutorials, and best practices in web development, programming, and technology.",
    url: "https://griffitystudios.com/blog",
    siteName: "Tech Blog",
    images: [
      {
        url: "/img-join-us.jpg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Tech Blog - Latest Articles",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Tech Insights & Tutorials",
    description:
      "Discover the latest insights, tutorials, and best practices in web development, programming, and technology.",
    images: ["/img-join-us.jpg?height=630&width=1200"],
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
  const categories = getCategories(articles);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Tech Insights & Tutorials",
    description:
      "A blog featuring the latest insights, tutorials, and best practices in web development and technology",
    url: "https://griffitystudios.com/blog",
    author: {
      "@type": "Organization",
      name: "Tech Blog Team",
    },
    blogPost: articles.map((article: ArticleItem) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      url: `https://griffitystudios.com/blog",/${article.id}`,
      datePublished: article.publishedAt,
      author: {
        "@type": "Person",
        name: article.author,
      },
      keywords: Array.isArray(article.tags) ? article.tags.join(", ") : "",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen" style={{ backgroundColor: "#081c26" }}>
        {/* Hero Section */}
        <header className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700/10 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="font-cormorantGaramond text-5xl lg:text-7xl font-bold text-amber-100">
                Insights & Tutorials
              </h1>
              <p className="font-poppins text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Discover the latest insights, tutorials, and best practices in
                web development, programming, and technology from industry
                experts.
              </p>
              {/* Home Button */}
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-poppins font-medium rounded-lg transition-colors duration-200"
                >
                  <HiHome className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 pt-8">
                <div className="flex items-center gap-2 text-amber-300">
                  <HiBookOpen className="w-5 h-5" />
                  <span className="font-poppins font-medium">
                    {articles.length}+ Articles
                  </span>
                </div>
                <div className="flex items-center gap-2 text-amber-300">
                  <HiUsers className="w-5 h-5" />
                  <span className="font-poppins font-medium">
                    Expert Authors
                  </span>
                </div>
                <div className="flex items-center gap-2 text-amber-300">
                  <HiTrendingUp className="w-5 h-5" />
                  <span className="font-poppins font-medium">
                    Weekly Updates
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-16">
            <ArticleItemList articles={articles} />
          </div>
        </main>

        {/* Newsletter Section */}
        {/* <section className="bg-slate-800/30 border-t border-slate-700/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="font-cormorantGaramond text-3xl lg:text-4xl text-amber-100 mb-4">Stay Updated</h2>
            <p className="font-poppins text-slate-300 mb-8 text-lg">
              Get the latest articles and tutorials delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-poppins font-medium rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
}
