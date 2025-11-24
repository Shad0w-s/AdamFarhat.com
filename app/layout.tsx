import type { Metadata } from 'next'
import './../styles/globals.css'
import MainLayout from '@/components/layout/MainLayout'
import Analytics from '@/components/common/Analytics'
import StructuredData from '@/components/common/StructuredData'
import BreakpointIndicator from '@/components/common/BreakpointIndicator'
import { WebVitals } from './web-vitals'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Adam Farhat - Student Founder, Builder, and Thinker',
  description: 'Personal website of Adam Farhat - showcasing projects, blog posts, and thoughts.',
  openGraph: {
    title: 'Adam Farhat',
    description: 'Student Founder, Builder, and Thinker',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MainLayout>
          {children}
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <StructuredData type="Person" data={{}} />
          <WebVitals />
        </MainLayout>
      </body>
    </html>
  )
}
