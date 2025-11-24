import { render, screen } from '@testing-library/react'
import AdvancedGrid from '@/components/common/AdvancedGrid'

describe('AdvancedGrid', () => {
  it('renders children', () => {
    render(
      <AdvancedGrid>
        <div>Item 1</div>
        <div>Item 2</div>
      </AdvancedGrid>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('applies grid classes by default', () => {
    const { container } = render(
      <AdvancedGrid>
        <div>Item</div>
      </AdvancedGrid>
    )
    expect(container.firstChild).toHaveClass('grid')
    expect(container.firstChild).toHaveClass('grid-cols-1') // Default
  })

  it('applies masonry classes when variant is masonry', () => {
    const { container } = render(
      <AdvancedGrid variant="masonry">
        <div>Item</div>
      </AdvancedGrid>
    )
    expect(container.firstChild).not.toHaveClass('grid')
    expect(container.firstChild).toHaveClass('columns-1') // Default
  })

  it('applies responsive column classes', () => {
    const { container } = render(
      <AdvancedGrid columns={{ default: 1, md: 2, lg: 3 }}>
        <div>Item</div>
      </AdvancedGrid>
    )
    expect(container.firstChild).toHaveClass('grid-cols-1')
    expect(container.firstChild).toHaveClass('md:grid-cols-2')
    expect(container.firstChild).toHaveClass('lg:grid-cols-3')
  })
})

