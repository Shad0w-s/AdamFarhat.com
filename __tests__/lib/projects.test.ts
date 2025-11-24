import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import fs from 'fs'
import path from 'path'

// Mock fs module
jest.mock('fs')
const mockedFs = fs as jest.Mocked<typeof fs>

describe('Projects Loader', () => {
  const mockProjectContent = `---
slug: test-project
title: "Test Project"
year: "2024"
category: "Product"
timeframe: "Jan 2024 – Apr 2024"
techStack: "Next.js, TypeScript"
accentColor: "#004c99"
image: "/images/projects/test.jpg"
---

## Problem

Test problem description.

## Solution

Test solution description.

## Outcome

Test outcome.

## Reflection

Test reflection.
`

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('getAllProjects returns all projects', () => {
    mockedFs.readdirSync.mockReturnValue(['example-project-1.md', 'example-project-2.md'] as any)
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(mockProjectContent)

    const projects = getAllProjects()
    expect(projects.length).toBeGreaterThan(0)
    expect(projects[0]).toHaveProperty('slug')
    expect(projects[0]).toHaveProperty('title')
    expect(projects[0]).toHaveProperty('year')
  })

  it('getProjectBySlug returns correct project', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(mockProjectContent)

    const project = getProjectBySlug('test-project')
    expect(project).not.toBeNull()
    expect(project?.title).toBe('Test Project')
    expect(project?.year).toBe('2024')
  })

  it('handles missing files gracefully', () => {
    mockedFs.existsSync.mockReturnValue(false)

    const project = getProjectBySlug('non-existent')
    expect(project).toBeNull()
  })

  it('validates frontmatter structure', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(mockProjectContent)

    const project = getProjectBySlug('test-project')
    expect(project).toHaveProperty('title')
    expect(project).toHaveProperty('year')
    expect(project).toHaveProperty('category')
  })

  it('returns correctly typed data', () => {
    mockedFs.existsSync.mockReturnValue(true)
    mockedFs.readFileSync.mockReturnValue(mockProjectContent)

    const project = getProjectBySlug('test-project')
    expect(project).toHaveProperty('problem')
    expect(project).toHaveProperty('solution')
  })
})

