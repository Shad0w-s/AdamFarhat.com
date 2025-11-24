import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ProjectSummary, ProjectDetailProps } from './types'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

function getProjectSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(projectsDirectory)
    return fileNames
      .filter((name) => name.endsWith('.md'))
      .map((name) => name.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading projects directory:', error)
    return []
  }
}

function getProjectDataBySlug(slug: string): ProjectDetailProps | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Extract sections from markdown
    const sections: Record<string, string> = {}
    const lines = content.split('\n')
    let currentSection = ''
    let currentContent: string[] = []

    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (currentSection) {
          sections[currentSection.toLowerCase()] = currentContent.join('\n').trim()
        }
        currentSection = line.replace('## ', '').trim()
        currentContent = []
      } else {
        currentContent.push(line)
      }
    }
    if (currentSection) {
      sections[currentSection.toLowerCase()] = currentContent.join('\n').trim()
    }

    return {
      title: data.title || '',
      year: data.year || '',
      category: data.category || '',
      timeframe: data.timeframe,
      image: data.image,
      techStack: data.techStack,
      accentColor: data.accentColor || '#004c99',
      problem: sections.problem || '',
      solution: sections.solution || '',
      outcome: sections.outcome || '',
      reflection: sections.reflection || '',
    }
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error)
    return null
  }
}

export function getAllProjects(): ProjectSummary[] {
  const slugs = getProjectSlugs()
  const projects = slugs
    .map((slug) => {
      const project = getProjectDataBySlug(slug)
      if (!project) return null

      return {
        slug,
        title: project.title,
        year: project.year,
        category: project.category,
        image: project.image || '/images/projects/default.jpg',
        accentColor: project.accentColor || '#004c99',
      }
    })
    .filter((p): p is ProjectSummary => p !== null)

  // Sort by year (newest first)
  return projects.sort((a, b) => b.year.localeCompare(a.year))
}

export function getProjectBySlug(slug: string): ProjectDetailProps | null {
  const project = getProjectDataBySlug(slug)
  if (!project) return null

  // Get related projects (same category, different slug)
  const allProjects = getAllProjects()
  const related = allProjects
    .filter((p) => p.slug !== slug && p.category === project.category)
    .slice(0, 3)

  return {
    ...project,
    relatedProjects: related,
  }
}

