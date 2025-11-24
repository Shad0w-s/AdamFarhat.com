import Link from 'next/link'
import Image from 'next/image'
import TagPill from '../common/TagPill'
import FloatingCard from '../common/FloatingCard'
import { ProjectCardProps } from '@/lib/types'

export default function ProjectCardGrid({
  slug,
  title,
  year,
  category,
  image,
  accentColor,
}: ProjectCardProps) {
  return (
    <FloatingCard>
      <Link
        href={`/projects/${slug}`}
        className="block group relative bg-background rounded-2xl shadow-nitro hover:shadow-nitro-lg transition-all duration-500 overflow-hidden h-full border border-foreground/5"
      >
        <div className="p-6 md:p-8 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <TagPill label={year} />
            <TagPill label={category} />
          </div>
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:opacity-70 transition-opacity flex-1 pr-4">
              {title}
            </h3>
            <svg
              className="w-6 h-6 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
          {image && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-auto">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}
        </div>
      </Link>
    </FloatingCard>
  )
}

