import Link from 'next/link'
import SectionContainer from '../common/SectionContainer'
import { BlogSummary } from '@/lib/types'

interface BlogPreviewProps {
  posts: BlogSummary[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const latestPosts = posts.slice(0, 3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  return (
    <SectionContainer>
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-sm font-mono text-foreground/60">. three latest notes</span>
        </div>
        <div className="space-y-1">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-center justify-between group py-3 hover:bg-foreground/5 px-4 -mx-4 rounded transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-medium text-foreground group-hover:opacity-70 transition-opacity mb-1">
                  {post.title}
                </h3>
                <time className="text-sm text-foreground/50 font-mono">
                  {formatDate(post.date)}
                </time>
              </div>
              <svg
                className="w-5 h-5 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0 ml-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M7 7h10v10"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-md hover:border-foreground/40 hover:bg-foreground/5 transition-all group"
        >
          <span>visit blog</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M7 7h10v10"
            />
          </svg>
        </Link>
      </div>
    </SectionContainer>
  )
}

