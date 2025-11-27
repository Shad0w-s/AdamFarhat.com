'use client'

import Image from 'next/image'
import styles from './stackedCards.module.css'

interface ContentBodyProps {
  heroImage?: string
  title: string
  index: number
}

export default function ContentBody({ heroImage, title, index }: ContentBodyProps) {
  return (
    <div className={styles.contentBody}>
      <div 
        className={styles.heroImageWrapper} 
        data-card-index={index}
        data-image-index={index}
      >
        {heroImage ? (
          <Image
            src={heroImage}
            alt={`${title} hero image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            className={styles.heroImage}
            priority={index === 0}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>Preview coming soon</span>
          </div>
        )}
      </div>
    </div>
  )
}


