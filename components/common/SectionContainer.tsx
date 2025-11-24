import { ReactNode } from 'react'

interface SectionContainerProps {
  id?: string
  children: ReactNode
  className?: string
  maxWidth?: 'content' | 'cardStack' | 'full'
}

export default function SectionContainer({
  id,
  children,
  className = '',
  maxWidth = 'content',
}: SectionContainerProps) {
  const maxWidthClasses = {
    content: 'max-w-content',
    cardStack: 'max-w-cardStack',
    full: 'max-w-full',
  }

      return (
        <section
          id={id}
          className={`mx-auto px-6 md:px-20 lg:px-24 xl:px-32 py-section-sm md:py-section ${maxWidthClasses[maxWidth]} ${className}`}
        >
          {children}
        </section>
      )
}

