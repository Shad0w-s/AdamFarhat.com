import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/projects/ProjectCard'
import { mockProjectSummary } from '@/__tests__/utils/mock-data'

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

describe('ProjectCard', () => {
  it('renders all props correctly', () => {
    render(<ProjectCard {...mockProjectSummary} />)
    expect(screen.getByText(mockProjectSummary.title)).toBeInTheDocument()
    expect(screen.getByText(mockProjectSummary.year)).toBeInTheDocument()
    expect(screen.getByText(mockProjectSummary.category)).toBeInTheDocument()
  })

  it('navigates on click', () => {
    render(<ProjectCard {...mockProjectSummary} />)
    const link = screen.getByText(mockProjectSummary.title).closest('a')
    expect(link).toHaveAttribute('href', `/projects/${mockProjectSummary.slug}`)
  })

  it('renders TagPills correctly', () => {
    render(<ProjectCard {...mockProjectSummary} />)
    expect(screen.getByText(mockProjectSummary.year)).toBeInTheDocument()
    expect(screen.getByText(mockProjectSummary.category)).toBeInTheDocument()
  })
})

