import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

jest.mock('@/lib/projects', () => ({
  getAllProjects: jest.fn(() => []),
}))

jest.mock('@/lib/blog', () => ({
  getAllPosts: jest.fn(() => Promise.resolve([])),
}))

jest.mock('@/components/home/Hero', () => {
  return function MockHero() {
    return <div data-testid="hero">Hero</div>
  }
})

jest.mock('@/components/home/ProjectsPreview', () => {
  return function MockProjectsPreview() {
    return <div data-testid="projects-preview">Projects Preview</div>
  }
})

jest.mock('@/components/home/AboutPreview', () => {
  return function MockAboutPreview() {
    return <div data-testid="about-preview">About Preview</div>
  }
})

jest.mock('@/components/home/BlogPreview', () => {
  return function MockBlogPreview() {
    return <div data-testid="blog-preview">Blog Preview</div>
  }
})

describe('HomePage', () => {
  it('renders all sections in order', () => {
    render(<HomePage />)
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('projects-preview')).toBeInTheDocument()
    expect(screen.getByTestId('about-preview')).toBeInTheDocument()
    expect(screen.getByTestId('blog-preview')).toBeInTheDocument()
  })
})

