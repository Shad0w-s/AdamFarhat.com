import { ProjectSummary } from './types'

export type FilterState = {
  category: string
  year: string
  search: string
}

export function filterProjects(projects: ProjectSummary[], filters: FilterState) {
  return projects.filter((project) => {
    const matchesCategory = filters.category === 'All' || project.category === filters.category
    const matchesYear = filters.year === 'All' || project.year === filters.year
    const matchesSearch = project.title.toLowerCase().includes(filters.search.toLowerCase())
    return matchesCategory && matchesYear && matchesSearch
  })
}

export function getUniqueCategories(projects: ProjectSummary[]) {
  const categories = projects.map((p) => p.category)
  return ['All', ...Array.from(new Set(categories))]
}

export function getUniqueYears(projects: ProjectSummary[]) {
  const years = projects.map((p) => p.year)
  return ['All', ...Array.from(new Set(years)).sort().reverse()]
}

