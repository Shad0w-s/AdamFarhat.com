import { render, screen } from '@testing-library/react'
import BlogCard from '@/components/blog/BlogCard'
import { mockBlogSummary } from '@/__tests__/utils/mock-data'

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

describe('BlogCard', () => {
  it('renders all props correctly', () => {
    render(<BlogCard {...mockBlogSummary} />)
    expect(screen.getByText(mockBlogSummary.title)).toBeInTheDocument()
    expect(screen.getByText(mockBlogSummary.excerpt)).toBeInTheDocument()
  })

  it('navigates on click', () => {
    render(<BlogCard {...mockBlogSummary} />)
    const link = screen.getByText(mockBlogSummary.title).closest('a')
    expect(link).toHaveAttribute('href', `/blog/${mockBlogSummary.slug}`)
  })

  it('handles missing image gracefully', () => {
    const { image, ...postWithoutImage } = mockBlogSummary
    render(<BlogCard {...postWithoutImage} />)
    expect(screen.getByText(mockBlogSummary.title)).toBeInTheDocument()
  })
})

