import { ProjectDetailProps, BlogPostLayoutProps } from '@/lib/types'

interface StructuredDataProps {
  type: 'Project' | 'BlogPosting' | 'Person'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let schema = {}

  if (type === 'Person') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Adam Farhat',
      url: 'https://adamfarhat.com',
      jobTitle: 'Student Founder',
      sameAs: [
        'https://twitter.com/adamfarhat',
        'https://linkedin.com/in/adamfarhat',
        'https://github.com/adamfarhat',
      ],
    }
  } else if (type === 'Project') {
    const project = data as ProjectDetailProps
    schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.title,
      description: project.problem,
      datePublished: project.year,
      author: {
        '@type': 'Person',
        name: 'Adam Farhat',
      },
    }
  } else if (type === 'BlogPosting') {
    const post = data as BlogPostLayoutProps
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: 'Adam Farhat',
      },
      image: post.image,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

