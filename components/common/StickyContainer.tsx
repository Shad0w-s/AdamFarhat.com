'use client'

import { ReactNode, useRef } from 'react'
import { useSticky } from '@/hooks/useSticky'

interface StickyContainerProps {
  children: ReactNode
  className?: string
  offset?: number
}

export default function StickyContainer({
  children,
  className = '',
  offset = 0,
}: StickyContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isSticky = useSticky(ref, offset)

  return (
    <div
      ref={ref}
      className={`sticky z-10 ${isSticky ? 'is-sticky' : ''} ${className}`}
      style={{ top: offset }}
    >
      {children}
    </div>
  )
}

