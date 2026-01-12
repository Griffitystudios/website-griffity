import {remark} from "remark";
import remarkGfm from "remark-gfm";   
import html from "remark-html";




export async function getArticleData(
  slug: string
): Promise<(ArticleItem & { content: string; category?: string; slug?: string }) | null> {
  const fileNames = fs.readdirSync(articlesDirectory);

  let matched: { fileName: string; fileContents: string; matterResult: ReturnType<typeof matter> } | null = null;

  for (const fileName of fileNames) {
    const idFromFile = fileName.replace(/\.md$/, "");
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);
    const slugField = matterResult.data.slug || idFromFile;

    if (slugField === slug || idFromFile === slug || fileName.includes(slug)) {
      matched = { fileName, fileContents, matterResult };
      break;
    }
  }

  if (!matched) return null;

  const { fileName, fileContents, matterResult } = matched;
  const id = fileName.replace(/\.md$/, "");
  const slugField = matterResult.data.slug || id;

  // Excerpt: first paragraph after frontmatter
  const excerptMatch = fileContents.split("---")[2]?.match(/\n([^#\n][^\n]*)/);
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

  // category from frontmatter if present
  const category = matterResult.data.category || "";

  // description
  const description = matterResult.data.description;

  // ✅ Parse markdown to HTML with GFM support
  const processedContent = await remark()
    .use(remarkGfm)   // 👈 enables tables, strikethrough, autolinks, task lists
    .use(html)
    .process(contentMd);

  const content = processedContent.toString();

  return {
    id,
    slug: slugField,
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

    //Category: from frontmatter or undefined
    const category = matterResult.data.category || "";

    // Slug: prefer frontmatter slug, fallback to file id
    const slug = matterResult.data.slug || id;

    return {
      id,
      slug,
      title: matterResult.data.title || id,
      excerpt,
      publishedAt,
      author,
      readTime,
      tags,
      imageUrl,
      category,
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