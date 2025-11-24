import { render, screen } from '@testing-library/react'
import ProjectsPreview from '@/components/home/ProjectsPreview'
import { mockProjectSummary } from '@/__tests__/utils/mock-data'

jest.mock('@/components/projects/ProjectCard', () => {
  return function MockProjectCard({ title }: { title: string }) {
    return <div data-testid="project-card">{title}</div>
  }
})

describe('ProjectsPreview', () => {
  const projects = [
    mockProjectSummary,
    { ...mockProjectSummary, slug: 'project-2', title: 'Project 2' },
    { ...mockProjectSummary, slug: 'project-3', title: 'Project 3' },
  ]

  it('renders heading', () => {
    render(<ProjectsPreview projects={projects} />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders correct number of projects', () => {
    render(<ProjectsPreview projects={projects} />)
    const cards = screen.getAllByTestId('project-card')
    expect(cards.length).toBe(3)
  })

  it('renders link to /projects', () => {
    render(<ProjectsPreview projects={projects} />)
    const link = screen.getByText('View all projects')
    expect(link.closest('a')).toHaveAttribute('href', '/projects')
  })

  it('handles empty projects array', () => {
    render(<ProjectsPreview projects={[]} />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })
})

