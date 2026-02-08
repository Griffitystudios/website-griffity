import Link from "next/link"
import { HiCalendar, HiClock, HiUser, HiArrowRight } from "react-icons/hi"

import type { ArticleItem } from "@/types"

interface Props {
  articles: ArticleItem[]
}

const ArticleItemList = ({ articles }: Props) => {
  return (
    <section className="flex flex-col gap-8">
      {/* Responsive grid: 1 col on mobile, 2 on md, 3 on lg+ */}
      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="group relative bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800/50 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1"
          >
            <Link href={`/blogs/${article.slug}`} className="block">
              {/* Image Container with Overlay */}
              {article.imageUrl && (
                <div className="relative w-full h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10" />
                  <img
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Read Time Badge on Image */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700/50">
                    <HiClock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-poppins font-medium text-white">
                      {article.readTime} min
                    </span>
                  </div>
                </div>
              )}

              {/* Content Container */}
              <div className="p-6 space-y-4">
                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-xs font-poppins font-medium rounded-md border border-amber-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="font-cormorantGaramond text-2xl lg:text-3xl text-white group-hover:text-amber-400 transition-colors duration-300 leading-tight line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-400 font-poppins text-sm leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Metadata Footer */}
                <div className="pt-4 border-t border-slate-800/50">
                  <div className="flex items-center justify-between">
                    {/* Author & Date */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-poppins">
                      <div className="flex items-center gap-1.5">
                        <HiUser className="w-3.5 h-3.5" />
                        <span>{article.author}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <HiCalendar className="w-3.5 h-3.5" />
                        <time dateTime={article.publishedAt}>
                          {new Date(article.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                    </div>

                    {/* Read More Arrow */}
                    <div className="flex items-center gap-1 text-amber-400 group-hover:gap-2 transition-all duration-300">
                      <span className="text-xs font-poppins font-medium">Read</span>
                      <HiArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ArticleItemList