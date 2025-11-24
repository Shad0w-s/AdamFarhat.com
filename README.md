# AdamFarhat.com

Personal website of Adam Farhat - showcasing projects, blog posts, and thoughts.

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Content:** Markdown files
- **Testing:** Jest, React Testing Library, Playwright

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file (optional, see `.env.example`)

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects pages
│   ├── blog/              # Blog pages
│   └── about/             # About page
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── home/              # Home page components
│   ├── projects/          # Project components
│   ├── blog/              # Blog components
│   ├── common/            # Shared components
│   └── about/             # About components
├── content/               # Markdown content
│   ├── projects/          # Project markdown files
│   └── blog/              # Blog post markdown files
├── lib/                   # Utility functions
│   ├── projects.ts        # Project content loader
│   ├── blog.ts            # Blog content loader
│   └── types.ts           # TypeScript types
└── __tests__/             # Test files
    ├── components/        # Component tests
    ├── lib/               # Library tests
    ├── pages/             # Page tests
    └── e2e/               # E2E tests
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:e2e` - Run E2E tests

## Testing

### Unit Tests

Unit tests are written using Jest and React Testing Library. Run tests with:

```bash
npm run test
```

### E2E Tests

E2E tests are written using Playwright. Run E2E tests with:

```bash
npm run test:e2e
```

## Content Management

### Adding Projects

Create a new markdown file in `content/projects/` with the following frontmatter:

```markdown
---
slug: project-slug
title: "Project Title"
year: "2024"
category: "Product"
timeframe: "Jan 2024 – Apr 2024"
techStack: "Next.js, TypeScript"
accentColor: "#004c99"
image: "/images/projects/project.jpg"
---

## Problem

Problem description.

## Solution

Solution description.

## Outcome

Outcome description.

## Reflection

Reflection paragraph.
```

### Adding Blog Posts

Create a new markdown file in `content/blog/` with the following frontmatter:

```markdown
---
slug: post-slug
title: "Post Title"
date: "2025-01-01"
image: "/images/blog/post.jpg"
---

Post content here.
```

## Deployment

The site is configured for static export and can be deployed to:

- **Vercel** (recommended) - Automatic deployments from Git
- **Netlify** - Static site hosting
- **GitHub Pages** - Free static hosting
- Any static hosting service

Build for production:

```bash
npm run build
```

The output will be in the `out/` directory.

## Environment Variables

See `.env.example` for available environment variables. Copy to `.env.local` for local development.

## Code Quality

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit linting and pre-push testing
- **TypeScript** - Type safety

## License

Private project - All rights reserved.

