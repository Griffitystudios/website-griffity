import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSortedArticles } from "@/lib/articles";

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const tagParam = decodeURIComponent(tag);
  const title = `Articles tagged "${tagParam}" | Griffity Studios`;
  const description = `Explore articles tagged with ${tagParam} from Griffity Studios.`;
  const canonical = `https://www.griffitystudios.com/tags/${encodeURIComponent(tagParam)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Griffity Studios",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const tagParam = decodeURIComponent(tag);
  const articles = getSortedArticles();

  const taggedArticles = articles.filter((article) =>
    article.tags?.some((tag) => normalize(tag) === normalize(tagParam))
  );

  if (taggedArticles.length === 0) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 text-slate-100">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-wide text-amber-300/80">Tag</p>
        <h1 className="mt-1 text-3xl font-semibold text-white">#{tagParam}</h1>
        <p className="mt-3 text-slate-300">
          Articles and resources labeled with this topic from Griffity Studios.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {taggedArticles.map((article) => (
          <Link
            key={article.id}
            href={`/blogs/${article.slug || article.id}`}
            className="group block rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg transition hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-amber-500/10"
          >
            <p className="text-xs uppercase tracking-wide text-amber-300/80">
              {article.category || "Article"}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white group-hover:text-amber-200">
              {article.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm text-slate-300">{article.excerpt}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>{article.publishedAt}</span>
              <span aria-hidden>•</span>
              <span>{article.readTime} min read</span>
            </div>
            {article.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-amber-700/40 bg-amber-700/20 px-3 py-1 text-xs text-amber-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
