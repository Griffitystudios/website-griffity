import { notFound } from "next/navigation";
import { FaCalendar, FaClock, FaUser, FaTag, FaBookmark, FaShareAlt, FaArrowUp } from "react-icons/fa";
import Link from "next/link";
import { Metadata } from "next";

import Breadcrumbs from "@/components/breadcrumbs";
import SocialShare from "@/components/social-share";
import RelatedArticles from "@/components/related-articles";
import ArticleFloatingActions from "@/components/article-floating-actions";
import ArticleSidebarInteractive from "@/components/article-sidebar-interactive";
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

  const categoryText = article.category ? ` | ${article.category}` : "";
  const metaDescription = article.description || article.excerpt;

  return {
    title: `${article.title}${categoryText} | Griffity Studios Blog`,
    description: metaDescription.substring(0, 155),
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

      <div className="min-h-screen bg-body relative">
        {/* Floating Action Buttons (client) */}
        <ArticleFloatingActions />

        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Blogs", href: "/blogs" },
                { label: article.title },
              ]}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content - Wider */}
            <main className="lg:col-span-8">
              <article>
                {/* Article Header */}
                <header className="mb-10">
                  {/* Category & Read Time Row */}
                  <div className="flex items-center justify-between mb-6">
                    {article.category && (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-wider uppercase rounded-full border border-amber-500/20">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                        {article.category}
                      </span>
                    )}
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <FaClock className="w-3.5 h-3.5" />
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                    {article.title}
                  </h1>

                  {/* Description */}
                  <p className="text-xl text-slate-300 leading-relaxed mb-8 font-light">
                    {article.description}
                  </p>

                  {/* Author & Date */}
                  <div className="flex items-center gap-6 pb-6 border-b border-slate-700/30">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
                        {article.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">{article.author}</span>
                        <time dateTime={article.publishedAt} className="text-xs text-slate-400">
                          {new Date(article.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Featured Image */}
                {article.imageUrl && (
                  <figure className="mb-10 group">
                    <div className="relative overflow-hidden rounded-2xl bg-slate-800/30 border border-slate-700/30">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        title={article.title}
                        className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-body/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <figcaption className="sr-only">{article.title}</figcaption>
                  </figure>
                )}

                {/* Article Content - Wider */}
                <div
                  className="prose prose-invert prose-lg lg:prose-xl max-w-none
                    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-700/30
                    prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-3
                    prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-light prose-p:text-[1.125rem]
                    prose-a:text-amber-400 prose-a:no-underline hover:prose-a:text-amber-300 hover:prose-a:underline prose-a:transition prose-a:font-normal
                    prose-strong:text-white prose-strong:font-semibold
                    prose-ul:my-6 prose-li:text-slate-300 prose-li:mb-3 prose-li:font-light prose-li:text-[1.125rem]
                    prose-ol:my-6
                    prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-slate-700/50 prose-img:my-8
                    prose-code:text-amber-400 prose-code:bg-slate-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-slate-700/30 prose-code:font-normal
                    prose-pre:bg-slate-950/50 prose-pre:shadow-xl prose-pre:border prose-pre:border-slate-700/50 prose-pre:rounded-xl prose-pre:my-8
                    prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-slate-800/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-xl prose-blockquote:text-slate-300 prose-blockquote:my-8"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags Section */}
                {article.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-slate-700/30">
                    <div className="flex items-center gap-2 mb-5">
                      <FaTag className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        Related Topics
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {article.tags.map((tag: string) => (
                        <Link href={`/tags/${tag}`} key={tag}>
                          <span className="inline-block px-4 py-2.5 bg-slate-800/40 text-slate-300 text-sm font-medium rounded-xl border border-slate-700/30 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/20 hover:scale-105 transition-all duration-200 cursor-pointer">
                            #{tag}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio Card */}
                <div className="mt-12 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Written by {article.author}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Content creator and writer at Griffity Studios, sharing insights on technology, design, and innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              {/* Share Card */}
              <div className="sticky top-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaShareAlt className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Share Article
                  </h3>
                </div>
                <SocialShare
                  url={currentUrl}
                  title={article.title}
                  description={article.excerpt}
                />
              </div>

              {/* Interactive Sidebar (client) */}
              <ArticleSidebarInteractive />
            </aside>
          </div>

          {/* Related Articles */}
          <div className="mt-20">
            <RelatedArticles
              articles={allArticles.filter(
                (a) => a.category === article.category
              )}
              currentSlug={article.slug}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;