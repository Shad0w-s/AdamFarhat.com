import { render, screen, waitFor } from '@testing-library/react'
import Hero from '@/components/home/Hero'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}))

describe('Hero', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders static text', () => {
    render(<Hero />)
    expect(screen.getByText(/a student founder curious about/i)).toBeInTheDocument()
  })

  it('rotates through suffixes', async () => {
    render(<Hero />)
    
    await waitFor(() => {
      const suffix = screen.getByText(/AI in "boring" industries|seamless, intuitive UI/i)
      expect(suffix).toBeInTheDocument()
    })
  })

  it('changes suffix after interval', async () => {
    render(<Hero />)
    
    const initialSuffix = screen.queryByText(/AI in "boring" industries/i)
    
    jest.advanceTimersByTime(2000)
    
    await waitFor(() => {
      // Suffix should have changed
      expect(screen.getByText(/seamless, intuitive UI/i)).toBeInTheDocument()
    })
  })

  it('handles component unmount during rotation', () => {
    const { unmount } = render(<Hero />)
    unmount()
    // Should not throw errors
  })
})

