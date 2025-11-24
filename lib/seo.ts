import { Metadata } from 'next'
import { env } from './env'

interface SEOProps {
  title: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  date?: string
}

export function generateSEO({
  title,
  description,
  image,
  type = 'website',
  date,
}: SEOProps): Metadata {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL
  const url = new URL(siteUrl)
  
  return {
    title: `${title} | Adam Farhat`,
    description: description || 'Student Founder, Builder, and Thinker',
    openGraph: {
      title: `${title} | Adam Farhat`,
      description: description || 'Student Founder, Builder, and Thinker',
      type,
      url: url.toString(),
      images: image ? [{ url: image }] : undefined,
      ...(date ? { publishedTime: date } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Adam Farhat`,
      description: description || 'Student Founder, Builder, and Thinker',
      images: image ? [image] : undefined,
    },
    metadataBase: url,
  }
}

