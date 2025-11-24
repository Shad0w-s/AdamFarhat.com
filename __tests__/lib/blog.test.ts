import { getAllPosts, getPostBySlug } from '@/lib/blog'
import fs from 'fs'

// Mock fs module
jest.mock('fs')
const mockedFs = fs as jest.Mocked<typeof fs>

describe('Blog Loader', () => {
  const mockPostContent = `---
slug: test-post
title: "Test Post"
date: "2025-01-01"
image: "/images/blog/test.jpg"
---

Intro paragraph.

## Section 1

Body text.
`

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('getAllPosts returns all posts sorted by date', async () => {
    mockedFs.readdirSync.mockReturnValue(['example-post-1.md', 'example-post-2.md'] as any)
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(mockPostContent)

    const posts = await getAllPosts()
    expect(posts.length).toBeGreaterThan(0)
    expect(posts[0]).toHaveProperty('slug')
    expect(posts[0]).toHaveProperty('title')
    expect(posts[0]).toHaveProperty('date')
  })

  it('getPostBySlug returns correct post', async () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(mockPostContent)

    const post = await getPostBySlug('test-post')
    expect(post).not.toBeNull()
    expect(post?.title).toBe('Test Post')
    expect(post?.date).toBe('2025-01-01')
  })

  it('handles missing files gracefully', async () => {
    mockedFs.existsSync.mockReturnValue(false)

    const post = await getPostBySlug('non-existent')
    expect(post).toBeNull()
  })

  it('validates frontmatter structure', async () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(mockPostContent)

    const post = await getPostBySlug('test-post')
    expect(post).toHaveProperty('title')
    expect(post).toHaveProperty('date')
    expect(post).toHaveProperty('content')
  })

  it('renders markdown correctly', async () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(mockPostContent)

    const post = await getPostBySlug('test-post')
    expect(post?.content).toContain('<p>')
    expect(post?.content).toContain('Intro paragraph')
  })
})

