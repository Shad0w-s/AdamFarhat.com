import Image from 'next/image'
import TagPill from '../common/TagPill'
import SectionContainer from '../common/SectionContainer'
import Link from 'next/link'
import { ProjectDetailProps } from '@/lib/types'

export default function ProjectDetailLayout({
  title,
  year,
  category,
  timeframe,
  image,
  problem,
  solution,
  techStack,
  outcome,
  reflection,
  relatedProjects,
}: ProjectDetailProps) {
  return (
    <SectionContainer>
      <article>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <TagPill label={year} />
            <TagPill label={category} />
            {timeframe && <TagPill label={timeframe} />}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        </div>

        {/* Hero Image */}
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

        {/* Problem */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Problem</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {problem}
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Solution</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {solution}
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        {techStack && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
            <p className="text-gray-700 dark:text-gray-300">{techStack}</p>
          </section>
        )}

        {/* Outcome */}
        {outcome && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Outcome</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {outcome}
              </p>
            </div>
          </section>
        )}

        {/* Reflection */}
        {reflection && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reflection</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {reflection}
              </p>
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold mb-4">See also</h2>
            <ul className="space-y-2">
              {relatedProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-foreground hover:opacity-80 transition-opacity"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </SectionContainer>
  )
}

