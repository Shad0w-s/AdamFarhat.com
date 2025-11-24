import { render, screen } from '@testing-library/react'
import TagPill from '@/components/common/TagPill'

describe('TagPill', () => {
  it('renders label text', () => {
    render(<TagPill label="2024" />)
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('applies correct styling', () => {
    const { container } = render(<TagPill label="Product" />)
    const pill = container.firstChild
    expect(pill).toHaveClass('rounded-full')
    expect(pill).toHaveClass('text-xs')
    expect(pill).toHaveClass('font-medium')
  })

  it('applies custom className', () => {
    const { container } = render(<TagPill label="Test" className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})

