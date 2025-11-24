import { render, screen } from '@testing-library/react'
import SectionContainer from '@/components/common/SectionContainer'

describe('SectionContainer', () => {
  it('renders children', () => {
    render(
      <SectionContainer>
        <div>Test Content</div>
      </SectionContainer>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct max-width for content', () => {
    const { container } = render(
      <SectionContainer maxWidth="content">
        <div>Content</div>
      </SectionContainer>
    )
    expect(container.firstChild).toHaveClass('max-w-content')
  })

  it('applies correct max-width for cardStack', () => {
    const { container } = render(
      <SectionContainer maxWidth="cardStack">
        <div>Content</div>
      </SectionContainer>
    )
    expect(container.firstChild).toHaveClass('max-w-cardStack')
  })

  it('accepts and applies id prop', () => {
    const { container } = render(
      <SectionContainer id="test-section">
        <div>Content</div>
      </SectionContainer>
    )
    expect(container.firstChild).toHaveAttribute('id', 'test-section')
  })

  it('applies custom className', () => {
    const { container } = render(
      <SectionContainer className="custom-class">
        <div>Content</div>
      </SectionContainer>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})

