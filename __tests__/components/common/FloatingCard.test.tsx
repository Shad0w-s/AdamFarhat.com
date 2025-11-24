import { render, screen, fireEvent } from '@testing-library/react'
import FloatingCard from '@/components/common/FloatingCard'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onMouseMove, onMouseLeave, style, className }: any) => (
      <div 
        data-testid="floating-card"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={style}
        className={className}
      >
        {children}
      </div>
    ),
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
}))

describe('FloatingCard', () => {
  it('renders children', () => {
    render(<FloatingCard><div>Content</div></FloatingCard>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies className', () => {
    render(<FloatingCard className="test-class"><div>Content</div></FloatingCard>)
    expect(screen.getByTestId('floating-card')).toHaveClass('test-class')
  })

  it('handles mouse interaction', () => {
    render(<FloatingCard><div>Content</div></FloatingCard>)
    const card = screen.getByTestId('floating-card')
    
    // Mock getBoundingClientRect
    jest.spyOn(card, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 200,
      top: 0,
      left: 0,
      bottom: 200,
      right: 200,
    } as DOMRect)

    fireEvent.mouseMove(card, { clientX: 50, clientY: 50 })
    expect(card).toHaveStyle({ transition: 'all 0.1s ease' })
    
    fireEvent.mouseLeave(card)
    expect(card).toHaveStyle({ transition: 'all 0.5s ease' })
  })
})

