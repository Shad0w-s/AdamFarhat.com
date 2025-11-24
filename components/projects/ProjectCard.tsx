import Link from 'next/link'
import Image from 'next/image'
import TagPill from '../common/TagPill'
import { ProjectCardProps } from '@/lib/types'

export default function ProjectCard({
  slug,
  title,
  year,
  category,
  image,
  accentColor,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="block group relative min-h-[400px] md:min-h-[500px] transition-all duration-300 overflow-hidden"
      style={{ backgroundColor: accentColor }}
    >
      <div className="p-8 md:p-12 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <span className="text-sm font-mono text-white/80">{year}</span>
          <span className="text-sm font-medium text-white/80">{category}</span>
        </div>
        <div className="flex justify-between items-start mb-auto">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight pr-8">
            {title}
          </h3>
          <svg
            className="w-12 h-12 md:w-16 md:h-16 text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all flex-shrink-0"
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
          <div className="relative w-full h-48 md:h-64 mt-8 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </div>
    </Link>
  )
}

