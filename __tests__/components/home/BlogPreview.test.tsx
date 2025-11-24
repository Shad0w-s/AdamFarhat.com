import { render, screen } from '@testing-library/react'
import BlogPreview from '@/components/home/BlogPreview'
import { mockBlogSummary } from '@/__tests__/utils/mock-data'

jest.mock('@/components/blog/BlogCard', () => {
  return function MockBlogCard({ title }: { title: string }) {
    return <div data-testid="blog-card">{title}</div>
  }
})

describe('BlogPreview', () => {
  const posts = [
    mockBlogSummary,
    { ...mockBlogSummary, slug: 'post-2', title: 'Post 2' },
    { ...mockBlogSummary, slug: 'post-3', title: 'Post 3' },
    { ...mockBlogSummary, slug: 'post-4', title: 'Post 4' },
  ]

  it('shows only latest 3 posts', () => {
    render(<BlogPreview posts={posts} />)
    const cards = screen.getAllByTestId('blog-card')
    expect(cards.length).toBe(3)
  })

  it('renders BlogCard for each', () => {
    render(<BlogPreview posts={posts} />)
    expect(screen.getByText('Why I Build Deceptively Simple Things')).toBeInTheDocument()
  })

  it('renders link to /blog', () => {
    render(<BlogPreview posts={posts} />)
    const link = screen.getByText('View all posts')
    expect(link.closest('a')).toHaveAttribute('href', '/blog')
  })
})

