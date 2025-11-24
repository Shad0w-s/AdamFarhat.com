import { getAllProjects } from '@/lib/projects'
import ProjectCard from '@/components/projects/ProjectCard'
import SectionContainer from '@/components/common/SectionContainer'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Suspense } from 'react'

async function ProjectsContent() {
  const projects = getAllProjects()
  
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">No projects found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          slug={project.slug}
          title={project.title}
          year={project.year}
          category={project.category}
          image={project.image}
          accentColor={project.accentColor}
        />
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <SectionContainer maxWidth="full" className="max-w-container">
      <h1 className="text-display-sm font-display font-bold mb-16 md:mb-24">Projects</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectsContent />
      </Suspense>
    </SectionContainer>
  )
}
