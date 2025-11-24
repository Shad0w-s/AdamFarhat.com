import Link from 'next/link'
import Image from 'next/image'
import { BlogCardProps } from '@/lib/types'

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
  image,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link
      href={`/blog/${slug}`}
      className="block group bg-background rounded-2xl shadow-nitro hover:shadow-nitro-lg transition-all duration-500 overflow-hidden border border-foreground/5"
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {image && (
            <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}
          <div className="flex-1">
            <time className="text-xs font-mono text-foreground/50 mb-3 block">
              {formattedDate}
            </time>
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3 group-hover:opacity-70 transition-opacity">
              {title}
            </h3>
            <p className="text-foreground/60 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

