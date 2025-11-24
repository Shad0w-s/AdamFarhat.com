import Link from 'next/link'
import Image from 'next/image'
import TagPill from '../common/TagPill'
import FloatingCard from '../common/FloatingCard'
import { ProjectCardProps } from '@/lib/types'

export default function ProjectCardList({
  slug,
  title,
  year,
  category,
  image,
  accentColor,
}: ProjectCardProps) {
  return (
    <FloatingCard parallaxDistance={10}>
      <Link
        href={`/projects/${slug}`}
        className="block group relative bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
        style={{ borderLeft: `4px solid ${accentColor}` }}
      >
        <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
          {image && (
            <div className="relative w-full md:w-48 aspect-video md:aspect-square rounded-md overflow-hidden shrink-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="flex-grow w-full">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-foreground group-hover:opacity-80 transition-opacity">
                {title}
              </h3>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-foreground group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <div className="flex gap-3 mt-4">
              <TagPill label={year} />
              <TagPill label={category} />
            </div>
          </div>
        </div>
      </Link>
    </FloatingCard>
  )
}

