import Image from 'next/image'
import Link from 'next/link'
import SectionContainer from '../common/SectionContainer'
import { BlogPostLayoutProps } from '@/lib/types'
import { getReadingTimeForPost } from '@/lib/blog'

export default function BlogPostLayout({
  title,
  date,
  content,
  image,
}: BlogPostLayoutProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const readingTime = getReadingTimeForPost(content)

  return (
    <SectionContainer>
      <article>
        <Link
          href="/blog"
          className="inline-block mb-6 text-foreground hover:opacity-80 transition-opacity"
        >
          ← Back to blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={date}>{formattedDate}</time>
            {readingTime > 0 && <span>{readingTime} min read</span>}
          </div>
        </header>

        {image && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/blog"
            className="text-foreground hover:opacity-80 transition-opacity"
          >
            ← Back to blog
          </Link>
        </div>
      </article>
    </SectionContainer>
  )
}

