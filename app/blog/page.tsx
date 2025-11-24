import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import SectionContainer from '@/components/common/SectionContainer'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { Suspense } from 'react'

async function BlogList() {
  const posts = await getAllPosts()

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          date={post.date}
          excerpt={post.excerpt}
          image={post.image}
        />
      ))}
    </div>
  )
}

export default function BlogPage() {
  return (
    <SectionContainer>
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <BlogList />
      </Suspense>
    </SectionContainer>
  )
}

