import { ReactNode } from 'react'

interface AdvancedGridProps {
  children: ReactNode
  className?: string
  variant?: 'grid' | 'masonry'
  columns?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: number
}

export default function AdvancedGrid({
  children,
  className = '',
  variant = 'grid',
  columns = { default: 1, md: 2, lg: 3 },
  gap = 6,
}: AdvancedGridProps) {
  if (variant === 'masonry') {
    // Use CSS columns for masonry layout
    const columnClasses: Record<number, string> = {
      1: 'columns-1',
      2: 'columns-2',
      3: 'columns-3',
      4: 'columns-4',
    }
    
    const gapClasses: Record<number, string> = {
      2: 'gap-2',
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
    }

    const masonryClasses = [
      columnClasses[columns.default || 1],
      columns.sm && `sm:${columnClasses[columns.sm]}`,
      columns.md && `md:${columnClasses[columns.md]}`,
      columns.lg && `lg:${columnClasses[columns.lg]}`,
      columns.xl && `xl:${columnClasses[columns.xl]}`,
      gapClasses[gap] || 'gap-6',
      'space-y-6',
      className
    ].filter(Boolean).join(' ')

    return (
      <div className={masonryClasses}>
        {children}
      </div>
    )
  }

  // Default Grid - use explicit Tailwind classes
  const gridColClasses: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }
  
  const gapClasses: Record<number, string> = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  }

  const gridClasses = [
    'grid',
    gapClasses[gap] || 'gap-6',
    gridColClasses[columns.default || 1],
    columns.sm && `sm:${gridColClasses[columns.sm]}`,
    columns.md && `md:${gridColClasses[columns.md]}`,
    columns.lg && `lg:${gridColClasses[columns.lg]}`,
    columns.xl && `xl:${gridColClasses[columns.xl]}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={gridClasses}>
      {children}
    </div>
  )
}

