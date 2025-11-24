import { render, screen } from '@testing-library/react'
import AboutPreview from '@/components/home/AboutPreview'

describe('AboutPreview', () => {
  const bio = 'This is a test bio about Adam Farhat.'

  it('renders bio text', () => {
    render(<AboutPreview bio={bio} />)
    expect(screen.getByText(bio)).toBeInTheDocument()
  })

  it('renders link to /about', () => {
    render(<AboutPreview bio={bio} />)
    const link = screen.getByText('More about me')
    expect(link.closest('a')).toHaveAttribute('href', '/about')
  })
})

