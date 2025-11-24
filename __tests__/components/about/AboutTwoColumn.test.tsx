import { render, screen } from '@testing-library/react'
import AboutTwoColumn from '@/components/about/AboutTwoColumn'

jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

describe('AboutTwoColumn', () => {
  const props = {
    image: '/images/about/test.jpg',
    title: 'Test Title',
    body: <p>Test body content</p>,
  }

  it('renders image and text', () => {
    render(<AboutTwoColumn {...props} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test body content')).toBeInTheDocument()
    expect(screen.getByAltText('Test Title')).toBeInTheDocument()
  })

  it('handles missing image', () => {
    render(<AboutTwoColumn {...props} image="" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})

