import Link from "next/link"
import { HiCalendar, HiClock, HiUser } from "react-icons/hi"

import type { ArticleItem } from "@/types"

interface Props {
  articles: ArticleItem[]
}

const ArticleItemList = ({ articles }: Props) => {
  return (
    <section className="flex flex-col gap-8">
      {/* Responsive grid: 1 col on mobile, 2 on md, 3 on lg+ */}
      <div className="grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-amber-700/50 transition-all duration-300 hover:bg-slate-800/70 flex flex-col h-full"
          >
            <Link href={`/blogs/${article.id}`} className="block h-full">
              {article.imageUrl && (
                <div className="w-full h-48 mb-4">
                  <img
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col space-y-3">
                <h3 className="font-cormorantGaramond text-2xl lg:text-3xl text-amber-100 group-hover:text-amber-300 transition-colors duration-200">
                  {article.title}
                </h3>

                <p className="text-slate-300 font-poppins text-base leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 font-poppins">
                  <div className="flex items-center gap-1">
                    <HiUser className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiCalendar className="w-4 h-4" />
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiClock className="w-4 h-4" />
                    <span>{article.readTime} min read</span>
                  </div>
                </div>

                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-amber-700/20 text-amber-300 text-xs font-poppins rounded-full border border-amber-700/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ArticleItemList
