import { notFound } from "next/navigation";
import { FaCalendar, FaClock, FaUser } from "react-icons/fa";
import Link from "next/link";
import { Metadata } from "next";

import Breadcrumbs from "@/components/breadcrumbs";
import SocialShare from "@/components/social-share";
import RelatedArticles from "@/components/related-articles";
import { getArticleData, getSortedArticles } from "@/lib/articles";
import type { ArticleItem } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface MetadataProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleData(slug);

  if (!article) {
    return {
      title: "Article Not Found | Griffity Studios",
      description: "Sorry, the requested article could not be found.",
    };
  }

  // Ensure category has a default value for SEO
  const categoryText = article.category ? ` | ${article.category}` : "";
  const metaDescription = article.description || article.excerpt;

  return {
    title: `${article.title}${categoryText} | Griffity Studios Blog`,
    description: metaDescription.substring(0, 155), // Google recommends 150-160 characters
    keywords: `${article.tags.join(", ")}${article.category ? `, ${article.category}` : ""}, ${article.title}, Griffity Studios`,
    authors: [{ name: article.author }],
    creator: article.author,
    publisher: "Griffity Studios",
    category: article.category || "Technology",
    classification: "Blog",
    alternates: {
      canonical: `https://www.griffitystudios.com/blogs/${article.slug}`,
    },
    openGraph: {
      title: `${article.title}${categoryText}`,
      description: metaDescription.substring(0, 155),
      url: `https://www.griffitystudios.com/blogs/${article.slug}`,
      siteName: "Griffity Studios",
      images: [
        {
          url: article.imageUrl || "/placeholder.svg?height=630&width=1200",
          width: 1200,
          height: 630,
          alt: article.title,
          type: "image/jpeg",
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title}${categoryText}`,
      description: metaDescription.substring(0, 155),
      images: [article.imageUrl || "/placeholder.svg?height=630&width=1200"],
      creator: `@GrifityStudios`,
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
}

const ArticlePage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const article = await getArticleData(slug);
  const allArticles = getSortedArticles();

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.griffitystudios.com/blogs/${article.slug}`,
    headline: article.title,
    alternativeHeadline: article.excerpt,
    description: article.description || article.excerpt,
    image: {
      "@type": "ImageObject",
      url: article.imageUrl || "https://www.griffitystudios.com/logo.png",
      height: 630,
      width: 1200,
    },
    url: `https://www.griffitystudios.com/blogs/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: article.author,
      url: "https://www.griffitystudios.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Griffity Studios",
      logo: {
        "@type": "ImageObject",
        url: "https://www.griffitystudios.com/logo.png",
        height: 60,
        width: 250,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.griffitystudios.com/blogs/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    articleSection: article.category || "Technology",
    wordCount: article.content.replace(/<[^>]+>/g, "").split(" ").length,
    articleBody: article.description || article.excerpt,
  };

  const currentUrl = `https://www.griffitystudios.com/blogs/${article.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.griffitystudios.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://www.griffitystudios.com/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: currentUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen" style={{ backgroundColor: "#081c26" }}>
        {/* Header */}
        <header className="border-b border-slate-700/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                {article.category && (
                  <span className="inline-block px-3 py-1 bg-amber-700/20 text-amber-300 text-sm font-poppins rounded-full border border-amber-700/30 mb-4">
                    {article.category}
                  </span>
                )}
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
                  <FaUser className="w-4 h-4" aria-hidden="true" />
                  <span>By <span className="font-semibold">{article.author}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" aria-hidden="true" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              {/* Featured Image */}
              {article.imageUrl && (
                <figure className="mb-8">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    title={article.title}
                    className="w-full h-64 lg:h-96 object-cover rounded-xl"
                    loading="eager"
                    decoding="async"
                  />
                  <figcaption className="sr-only">{article.title}</figcaption>
                </figure>
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
                  <Link href={`/tags/${tag}`} key={tag}>
                    <span className="px-3 py-1 bg-amber-700/20 text-amber-300 text-sm font-poppins rounded-full border border-amber-700/30">
                      #{tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <RelatedArticles
            articles={allArticles.filter(
              (a) => a.category === article.category
            )}
            currentSlug={article.slug}
          />
        </main>
      </div>
    </>
  );
};

export default ArticlePage;
