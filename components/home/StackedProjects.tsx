'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ProjectSummary } from '@/lib/types'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StackedProjectsProps {
  projects: ProjectSummary[]
}

export default function StackedProjects({ projects }: StackedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate dynamic spacing based on viewport
  const getDynamicSpacing = () => {
    if (typeof window === 'undefined') return 60
    const viewportHeight = window.innerHeight
    return Math.max(viewportHeight * 0.08, 60)
  }

  useGSAP(
    () => {
      if (!containerRef.current) return

      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
      const baseSpacing = getDynamicSpacing()

      // Create a single ScrollTrigger that tracks the container
      // Using optimized settings for smooth performance
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        anticipatePin: 1, // Optimize pinning performance
        onUpdate: (self) => {
          const progress = self.progress

          cardRefs.current.forEach((cardElement, index) => {
            if (!cardElement) return

            // Calculate progress for each card
            const cardStart = index / projects.length
            const cardEnd = (index + 1) / projects.length
            
            // Map progress to card-specific progress
            const cardProgress = gsap.utils.clamp(
              0,
              1,
              gsap.utils.mapRange(cardStart, cardEnd, 0, 1, progress, true)
            )

            // Calculate dynamic Y offset
            // Cards start spaced out and move closer together as scrolled
            const initialYOffset = index * baseSpacing
            const targetYOffset = index * baseSpacing - (viewportHeight * 0.12)
            const yOffset = gsap.utils.interpolate(
              initialYOffset,
              targetYOffset,
              cardProgress
            )

            // Scale animation: slight scale up in the middle
            const scale = gsap.utils.interpolate(
              [0.96, 1, 0.96],
              [0, 0.5, 1],
              cardProgress
            )

            // Apply transforms with GSAP for smooth performance
            gsap.set(cardElement, {
              y: yOffset,
              scale: scale,
              force3D: true,
            })
          })
        },
      })

      // Handle window resize with debouncing for performance
      const handleResize = () => {
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current)
        }
        resizeTimeoutRef.current = setTimeout(() => {
          ScrollTrigger.refresh()
        }, 150)
      }

      window.addEventListener('resize', handleResize, { passive: true })

      // Cleanup
      return () => {
        trigger.kill()
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current)
        }
        window.removeEventListener('resize', handleResize)
      }
    },
    {
      scope: containerRef,
      dependencies: [projects.length],
    }
  )

  return (
    <div ref={containerRef} className="relative">
      <div className="space-y-0">
        {projects.map((project, index) => {
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

          // Dynamic bottom margin based on viewport
          const dynamicBottomMargin = typeof window !== 'undefined'
            ? `-${window.innerHeight * 0.3}px`
            : '-200px'

          return (
            <div
              key={project.slug}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              style={{
                opacity: 1,
                zIndex: projects.length - index,
                marginBottom: dynamicBottomMargin,
              }}
              className="sticky top-20 md:top-24"
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
            </div>
          )
        })}
      </div>
    </div>
  )
}