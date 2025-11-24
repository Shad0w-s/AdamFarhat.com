'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ProjectSummary } from '@/lib/types'
import { useScroll, useTransform, motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface StackedProjectsProps {
  projects: ProjectSummary[]
}

export default function StackedProjects({ projects }: StackedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={containerRef} className="relative">
      <div className="space-y-0">
        {projects.map((project, index) => {
          // Calculate progress for each card
          const cardProgress = useTransform(
            scrollYProgress,
            [
              index / projects.length,
              (index + 0.5) / projects.length,
              (index + 1) / projects.length,
            ],
            [0, 1, 0]
          )

          // Sticky positioning with offset for stacking
          const yOffset = useTransform(
            cardProgress,
            [0, 1],
            [index * 60, index * 60 - 80]
          )

          const scale = useTransform(
            cardProgress,
            [0, 0.5, 1],
            [0.96, 1, 0.96]
          )

          // Determine colors based on index
          const isFirst = index === 0
          const isSecond = index === 1
          
          let bgColor = project.accentColor
          let textColor = 'text-white'
          let yearColor = 'text-white/80'
          let categoryColor = 'text-white/80'
          let lineColor = 'bg-white/20'
          let arrowColor = 'text-white/60'
          
          if (isFirst) {
            bgColor = '#FFFFFF'
            textColor = 'text-blue-600'
            yearColor = 'text-blue-600/80'
            categoryColor = 'text-blue-600/80'
            lineColor = 'bg-blue-600/20'
            arrowColor = 'text-blue-600/60'
          } else if (isSecond) {
            bgColor = '#1A1A1A'
            textColor = 'text-gray-300'
            yearColor = 'text-gray-300/80'
            categoryColor = 'text-gray-300/80'
            lineColor = 'bg-gray-300/20'
            arrowColor = 'text-gray-300/60'
          }

          return (
            <motion.div
              key={project.slug}
              style={{
                y: yOffset,
                opacity: 1, // Make cards fully opaque
                scale,
                zIndex: projects.length - index,
              }}
              className="sticky top-20 md:top-24 mb-[-200px] md:mb-[-300px]"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block group relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] mx-4 md:mx-8 lg:mx-16 xl:mx-24 transition-all duration-300 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15),0_10px_40px_rgba(0,0,0,0.1)]"
                style={{ backgroundColor: bgColor }}
              >
                <div className="p-8 md:p-12 lg:p-16 h-full flex flex-col">
                  <div className="flex flex-col mb-6 md:mb-8">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm md:text-base font-mono ${yearColor}`}>
                        {project.year}
                      </span>
                      <span className={`text-sm md:text-base font-medium ${categoryColor}`}>
                        {project.category}
                      </span>
                    </div>
                    {/* Horizontal line from year to category */}
                    <div className={`w-full h-px ${lineColor}`}></div>
                  </div>
                  <div className="flex justify-between items-start mb-auto">
                    <h3 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold ${textColor} leading-[0.95] pr-8 md:pr-12`}>
                      {project.title}
                    </h3>
                    <svg
                      className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 ${arrowColor} group-hover:opacity-100 group-hover:translate-x-2 group-hover:translate-y-[-2px] transition-all flex-shrink-0`}
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
                  {project.image && (
                    <div className="relative w-full h-48 md:h-64 lg:h-80 mt-8 md:mt-12 rounded-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

