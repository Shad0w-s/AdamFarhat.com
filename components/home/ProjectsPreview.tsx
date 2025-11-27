import Link from 'next/link'
import SectionContainer from '../common/SectionContainer'
import StackedCards from '../StackedCards/StackedCards'
import { CardData } from '../StackedCards/cardTypes'
import { ProjectSummary } from '@/lib/types'

interface ProjectsPreviewProps {
  projects: ProjectSummary[]
}

export default function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  const featuredProjects = projects.slice(0, 5)
  const cards: CardData[] = featuredProjects.map((project) => ({
    id: project.slug,
    title: project.title,
    year: project.year,
    category: project.category,
    heroImage: project.image,
    colorTheme: project.accentColor,
    ctaUrl: `/projects/${project.slug}`,
  }))

  return (
    <SectionContainer maxWidth="full" className="max-w-container">
      <div className="mb-8 md:mb-12">
        <h2 className="text-display-sm font-display font-bold mb-4 md:mb-6">Projects</h2>
        <p className="text-base md:text-lg text-foreground/70 max-w-2xl">
          A layered look at my latest three projects. Scroll to uncover each build and explore the thinking behind it.
        </p>
      </div>
      <StackedCards cards={cards} />
      <div className="text-center pt-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-md hover:border-foreground/40 hover:bg-foreground/5 transition-all group"
        >
          <span>view all projects</span>
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

