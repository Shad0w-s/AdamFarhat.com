import { render, screen } from '@testing-library/react'
import ProjectDetailLayout from '@/components/projects/ProjectDetailLayout'
import { mockProjectDetail } from '@/__tests__/utils/mock-data'

jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

describe('ProjectDetailLayout', () => {
  it('renders all sections in correct order', () => {
    render(<ProjectDetailLayout {...mockProjectDetail} />)
    expect(screen.getByText('Problem')).toBeInTheDocument()
    expect(screen.getByText('Solution')).toBeInTheDocument()
    expect(screen.getByText('Outcome')).toBeInTheDocument()
    expect(screen.getByText('Reflection')).toBeInTheDocument()
  })

  it('handles optional fields', () => {
    const { timeframe, techStack, ...projectWithoutOptional } = mockProjectDetail
    render(<ProjectDetailLayout {...projectWithoutOptional} />)
    expect(screen.getByText(mockProjectDetail.title)).toBeInTheDocument()
  })

  it('related projects section only shows if provided', () => {
    const { relatedProjects, ...projectWithoutRelated } = mockProjectDetail
    render(<ProjectDetailLayout {...projectWithoutRelated} />)
    expect(screen.queryByText('See also')).not.toBeInTheDocument()
  })
})

