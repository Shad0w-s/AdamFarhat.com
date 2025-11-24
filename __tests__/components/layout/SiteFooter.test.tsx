import { render, screen } from '@testing-library/react'
import SiteFooter from '@/components/layout/SiteFooter'

describe('SiteFooter', () => {
  it('renders footer content', () => {
    render(<SiteFooter />)
    expect(screen.getByText(/© \d{4} Adam Farhat/i)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<SiteFooter />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders social icons', () => {
    render(<SiteFooter />)
    const socialLinks = screen.getAllByLabelText(/Twitter|LinkedIn|GitHub/)
    expect(socialLinks.length).toBeGreaterThan(0)
  })
})

