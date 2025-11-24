import { render, screen } from '@testing-library/react'
import AnimatedSection from '@/components/common/AnimatedSection'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
  },
  useAnimation: () => ({ start: jest.fn() }),
  useInView: () => true,
}))

describe('AnimatedSection', () => {
  it('renders children', () => {
    render(<AnimatedSection>Content</AnimatedSection>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

