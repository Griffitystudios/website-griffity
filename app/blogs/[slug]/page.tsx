import { notFound } from "next/navigation";
import { FaCalendar, FaClock, FaUser, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Metadata } from "next";

import Breadcrumbs from "@/components/breadcrumbs";
import SocialShare from "@/components/social-share";
import RelatedArticles from "@/components/related-articles";
import { getArticleData, getSortedArticles } from "@/lib/articles";
import type { ArticleItem } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>; // Update to type params as a Promise
}

interface MetadataProps {
  params: Promise<{ slug: string }>; // Update to type params as a Promise
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = await params; // Await the params to resolve the Promise
  const article = await getArticleData(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | Tech Blog`,
    description: article.description,
    keywords: article.tags.join(", "),
    authors: [{ name: article.author }],
    creator: article.author,
    publisher: "Tech Blog",
    alternates: {
      canonical: `https://griffitystudios.com/blogs/${article.slug}`, // Fixed typo: added // before griffitystudios
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://griffitystudios.com/blogs/${article.slug}`, // Fixed typo: added // before griffitystudios
      siteName: "Tech Blog",
      images: [
        {
          url: article.imageUrl || "/placeholder.svg?height=630&width=1200",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl || "/placeholder.svg?height=630&width=1200"],
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
}

const ArticlePage = async ({ params }: PageProps) => {
  const { slug } = await params; // Await the params to resolve the Promise
  const article = await getArticleData(slug);
  const allArticles = getSortedArticles();

  if (!article) {
    notFound();
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl,
    url: `https:griffitystudios.com/blogs/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
      // description: article.authorBio, // Not available in markdown frontmatter
    },
    publisher: {
      "@type": "Organization",
      name: "Tech Blog",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https:griffitystudios.com/blogs/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    articleSection: article.category || "",
    wordCount: article.content.replace(/<[^>]+>/g, "").split(" ").length,
  };

  const currentUrl = `https:griffitystudios.com/blogs/${article.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen" style={{ backgroundColor: "#081c26" }}>
        {/* Header */}
        <header className="border-b border-slate-700/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* <div className="flex items-center justify-between mb-4">
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-slate-400 hover:text-amber-300 transition-colors font-poppins"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </div> */}

            <Breadcrumbs
              items={[
                { label: "Blogs", href: "/blogs" },

                { label: article.title },
              ]}
            />
          </div>
        </header>

        {/* Article Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
          <article>
            {/* Article Header */}
            <header className="mb-12">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-amber-700/20 text-amber-300 text-sm font-poppins rounded-full border border-amber-700/30 mb-4">
                  {article.category || ""}
                </span>
                <h1 className="font-cormorantGaramond text-4xl lg:text-5xl font-bold text-amber-100 mb-6 leading-tight">
                  {article.title}
                </h1>
                <p className="text-xl text-slate-300 font-poppins leading-relaxed mb-8">
                  {article.description}
                </p>
              </div>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-slate-400 font-poppins text-sm mb-8">
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-4 h-4" />
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              {/* Featured Image */}
              {article.imageUrl && (
                <div className="mb-8">
                  <img
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-64 lg:h-96 object-cover rounded-xl"
                  />
                </div>
              )}

              {/* Social Share */}
              <div className="mb-8">
                <SocialShare
                  url={currentUrl}
                  title={article.title}
                  description={article.excerpt}
                />
              </div>
            </header>

            {/* Article Content */}
            <div
              className="prose prose-invert prose-amber font-poppins max-w-none font-extralight"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-amber-700/20 text-amber-300 text-sm font-poppins rounded-full border border-amber-700/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            {/* Author bio not available in markdown frontmatter */}
          </article>

          {/* Related Articles */}
          {/* You may want to update RelatedArticles to use real articles */}
          <RelatedArticles
            articles={allArticles}
            currentArticleId={article.id}
          />
        </main>
      </div>
    </>
  );
};

export default ArticlePage;
