import { render, screen, fireEvent } from '@testing-library/react'
import SiteHeader from '@/components/layout/SiteHeader'

const mockUsePathname = jest.fn(() => '/')

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

jest.mock('@/components/common/ThemeToggle', () => {
  return function MockThemeToggle() {
    return <button data-testid="theme-toggle">Theme Toggle</button>
  }
})

describe('SiteHeader', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  it('renders site name as link', () => {
    render(<SiteHeader />)
    const logo = screen.getByText('Adam Farhat')
    expect(logo).toBeInTheDocument()
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders all navigation links', () => {
    render(<SiteHeader />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders ThemeToggle', () => {
    render(<SiteHeader />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('toggles mobile menu', () => {
    render(<SiteHeader />)
    const menuButton = screen.getByLabelText('Toggle menu')
    
    expect(screen.queryByText('Home')).toBeInTheDocument() // Desktop nav visible
    
    fireEvent.click(menuButton)
    expect(screen.getByLabelText('Toggle menu')).toHaveAttribute('aria-expanded', 'true')
    
    fireEvent.click(menuButton)
    expect(screen.getByLabelText('Toggle menu')).toHaveAttribute('aria-expanded', 'false')
  })

  it('highlights active route', () => {
    mockUsePathname.mockReturnValue('/projects')
    render(<SiteHeader />)
    
    const projectsLink = screen.getByText('Projects').closest('a')
    expect(projectsLink).toHaveClass('text-foreground')
  })
})

