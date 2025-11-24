import Hero from '@/components/home/Hero'
import ProjectsPreview from '@/components/home/ProjectsPreview'
import AboutPreview from '@/components/home/AboutPreview'
import BlogPreview from '@/components/home/BlogPreview'
import AnimatedSection from '@/components/common/AnimatedSection'
import { getAllProjects } from '@/lib/projects'
import { getAllPosts } from '@/lib/blog'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Suspense } from 'react'

const bio = "I'm a student founder passionate about building products that solve real problems. I believe in the power of simple, intuitive design and thoughtful engineering."

async function ProjectsSection() {
  const projects = getAllProjects()
  return <ProjectsPreview projects={projects} />
}

async function BlogSection() {
  const posts = await getAllPosts()
  return <BlogPreview posts={posts} />
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <AnimatedSection>
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectsSection />
        </Suspense>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <AboutPreview bio={bio} />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <Suspense fallback={<LoadingSpinner />}>
          <BlogSection />
        </Suspense>
      </AnimatedSection>
    </>
  )
}

