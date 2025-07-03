import Link from "next/link"
import { FaCalendar, FaClock } from "react-icons/fa"
import type { ArticleItem } from "@/types"

interface RelatedArticlesProps {
  articles: ArticleItem[]
  currentArticleId: string
}

export default function RelatedArticles({ articles, currentArticleId }: RelatedArticlesProps) {
  const relatedArticles = articles.filter((article) => article.id !== currentArticleId).slice(0, 3)

  if (relatedArticles.length === 0) return null

  return (
    <section className="mt-16 pt-16 border-t border-slate-700/50">
      <h2 className="font-cormorantGaramond text-3xl text-amber-100 mb-8">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map((article) => (
          <article
            key={article.id}
            className="group bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-amber-700/50 transition-all duration-300"
          >
            <Link href={`/blogs/${article.slug}`}>
              {article.imageUrl && (
                <img
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-cormorantGaramond text-xl text-amber-100 group-hover:text-amber-300 transition-colors mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-slate-300 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <FaCalendar className="w-3 h-3" />
                  <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString()}</time>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="w-3 h-3" />
                  <span>{article.readTime} min</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
