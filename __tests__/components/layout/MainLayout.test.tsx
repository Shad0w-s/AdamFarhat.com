import { render, screen } from '@testing-library/react'
import MainLayout from '@/components/layout/MainLayout'

jest.mock('@/components/layout/SiteHeader', () => {
  return function MockSiteHeader() {
    return <header data-testid="site-header">Site Header</header>
  }
})

jest.mock('@/components/layout/SiteFooter', () => {
  return function MockSiteFooter() {
    return <footer data-testid="site-footer">Site Footer</footer>
  }
})

describe('MainLayout', () => {
  it('renders header and footer', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('site-header')).toBeInTheDocument()
    expect(screen.getByTestId('site-footer')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('wraps children correctly', () => {
    render(
      <MainLayout>
        <div data-testid="child">Child Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})

