export interface ArticleItem {
  id: string
  title: string
  excerpt: string
  publishedAt: string
  author: string
  readTime: number
  tags: string[]
  imageUrl?: string
  slug?: string
}

export interface BlogCategory {
  name: string
  articles: ArticleItem[]
}
