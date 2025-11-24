import { ReactNode } from 'react'

interface CardStackProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  className?: string
}

export default function CardStack<T>({
  items,
  renderItem,
  className = '',
}: CardStackProps<T>) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className={`relative ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative"
          style={{
            transform: `translateY(${index * 8}px)`,
            zIndex: items.length - index,
          }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  )
}

