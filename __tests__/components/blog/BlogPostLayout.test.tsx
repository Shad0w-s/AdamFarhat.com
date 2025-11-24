import { render, screen } from '@testing-library/react'
import BlogPostLayout from '@/components/blog/BlogPostLayout'
import { mockBlogPost } from '@/__tests__/utils/mock-data'

jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

jest.mock('@/lib/blog', () => ({
  getReadingTimeForPost: jest.fn(() => 5),
}))

describe('BlogPostLayout', () => {
  it('renders all props correctly', () => {
    render(<BlogPostLayout {...mockBlogPost} />)
    expect(screen.getByText(mockBlogPost.title)).toBeInTheDocument()
  })

  it('renders "Back to blog" link', () => {
    render(<BlogPostLayout {...mockBlogPost} />)
    const links = screen.getAllByText(/back to blog/i)
    expect(links.length).toBeGreaterThan(0)
    expect(links[0].closest('a')).toHaveAttribute('href', '/blog')
  })

  it('handles missing image', () => {
    const { image, ...postWithoutImage } = mockBlogPost
    render(<BlogPostLayout {...postWithoutImage} />)
    expect(screen.getByText(mockBlogPost.title)).toBeInTheDocument()
  })
})

