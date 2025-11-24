import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { BlogSummary, BlogPostLayoutProps } from './types'

const blogDirectory = path.join(process.cwd(), 'content/blog')

function getBlogSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(blogDirectory)
    return fileNames
      .filter((name) => name.endsWith('.md'))
      .map((name) => name.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading blog directory:', error)
    return []
  }
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export async function getAllPosts(): Promise<BlogSummary[]> {
  const slugs = getBlogSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug)
      if (!post) return null

      // Extract excerpt (first paragraph or first 150 characters)
      const excerptMatch = post.content.match(/<p>(.*?)<\/p>/)
      const excerpt = excerptMatch
        ? excerptMatch[1].replace(/<[^>]*>/g, '').substring(0, 150)
        : post.content.substring(0, 150).replace(/<[^>]*>/g, '')

      return {
        slug,
        title: post.title,
        date: post.date,
        excerpt: excerpt + (excerpt.length >= 150 ? '...' : ''),
        image: post.image,
      }
    })
  )

  const validPosts = posts.filter((p) => p !== null) as BlogSummary[]

  // Sort by date (newest first)
  return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPostLayoutProps | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Process markdown to HTML
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      title: data.title || '',
      date: data.date || '',
      content: contentHtml,
      image: data.image,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function getReadingTimeForPost(content: string): number {
  return getReadingTime(content)
}

