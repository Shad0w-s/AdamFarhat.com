'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GridItemProps {
  children: ReactNode
  className?: string
  span?: {
    col?: number
    row?: number
  }
}

export default function GridItem({
  children,
  className = '',
  span
}: GridItemProps) {
  const spanClasses = span ? [
    span.col ? `col-span-${span.col}` : '',
    span.row ? `row-span-${span.row}` : '',
  ].join(' ') : ''

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`${spanClasses} ${className} break-inside-avoid mb-6`}
    >
      {children}
    </motion.div>
  )
}

