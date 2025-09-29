import {remark} from "remark";
import html from "remark-html";
export async function getArticleData(slug: string): Promise<(ArticleItem & {content: string; category?: string; slug?: string}) | null> {
  const fileNames = fs.readdirSync(articlesDirectory);
  const fileName = fileNames.find((f) => f.replace(/\.md$/, "") === slug || f.includes(slug));
  if (!fileName) return null;
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(articlesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);

  // Excerpt: first paragraph after frontmatter
  const excerptMatch = fileContents.split('---')[2]?.match(/\n([^#\n][^\n]*)/);
  const excerpt = excerptMatch ? excerptMatch[1].trim() : "";

  // PublishedAt: use 'date' from frontmatter, fallback to empty string
  const publishedAt = matterResult.data.date || "";

  // Author: from frontmatter or default
  const author = matterResult.data.author || "Griffity Studios";

  // Read time: estimate by word count (200 words/minute)
  const contentMd = fileContents.replace(/^---[\s\S]*?---/, "").trim();
  const wordCount = contentMd.split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  // Tags: from frontmatter or empty array
  const tags = matterResult.data.tags || [];

  // imageUrl: from frontmatter or undefined
  const imageUrl = matterResult.data.imageUrl;

  // category and slug from frontmatter if present
  const category = matterResult.data.category || "";
  const slugField = matterResult.data.slug || id;
  //description
  const description = matterResult.data.description;
  // Parse markdown to HTML
  const processedContent = await remark().use(html).process(contentMd);
  const content = processedContent.toString();

  return {
    id,
    title: matterResult.data.title || id,
    excerpt,
    publishedAt,
    description,
    author,
    readTime,
    tags,
    imageUrl,
    content,
    category,
    slug: slugField,
  };
}
import fs from "fs"
import matter from "gray-matter"
import path from "path"


import type {ArticleItem} from "@/types"

const articlesDirectory = path.join(process.cwd(), "articles")

export const getSortedArticles = (): ArticleItem[] => {
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData: ArticleItem[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);

    // Excerpt: first paragraph after frontmatter
    const excerptMatch = fileContents.split('---')[2]?.match(/\n([^#\n][^\n]*)/);
    const excerpt = excerptMatch ? excerptMatch[1].trim() : "";

    // PublishedAt: use 'date' from frontmatter, fallback to empty string
    const publishedAt = matterResult.data.date || "";

    // Author: from frontmatter or default
    const author = matterResult.data.author || "Griffity Studios";

    // Read time: estimate by word count (200 words/minute)
    const content = fileContents.split('---')[2] || "";
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    // Tags: from frontmatter or empty array
    const tags = matterResult.data.tags || [];

    // imageUrl: from frontmatter or undefined
    const imageUrl = matterResult.data.imageUrl;

    return {
      id,
      title: matterResult.data.title || id,
      excerpt,
      publishedAt,
      author,
      readTime,
      tags,
      imageUrl,
    };
  });

  // Sort by publishedAt (DD-MM-YYYY)
  return allArticlesData.sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    };
    const dateOne = parseDate(a.publishedAt);
    const dateTwo = parseDate(b.publishedAt);
    if (dateOne < dateTwo) {
      return -1;
    } else if (dateOne > dateTwo) {
      return 1;
    } else {
      return 0;
    }
  });
};