export type ProjectSummary = {
  slug: string
  title: string
  year: string
  category: string
  image: string
  accentColor: string
}

export type ProjectCardProps = {
  slug: string
  title: string
  year: string
  category: string
  image: string
  accentColor: string
}

export type ProjectDetailProps = {
  title: string
  year: string
  category: string
  timeframe?: string
  image?: string
  accentColor?: string
  problem: string
  solution: string
  techStack?: string
  outcome?: string
  reflection?: string
  relatedProjects?: ProjectSummary[]
}

export type BlogSummary = {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
}

export type BlogCardProps = {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
}

export type BlogPostLayoutProps = {
  title: string
  date: string
  content: string
  image?: string
}

