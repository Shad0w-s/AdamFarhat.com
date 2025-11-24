'use client'

import { forwardRef } from 'react'
import styles from './stackedCards.module.css'

interface TitleBandProps {
  year: string
  category: string
  title: string
  textColor: string
}

const TitleBand = forwardRef<HTMLDivElement, TitleBandProps>(function TitleBand(
  { year, category, title, textColor },
  ref
) {
  return (
    <div
      ref={ref}
      className={styles.titleBand}
      style={{ color: textColor }}
      data-testid="stacked-card-title-band"
    >
      <div className={styles.titleBandMeta}>
        <span className={styles.cardYear}>{year}</span>
        <span className={styles.titleBandDivider} aria-hidden="true" />
        <span className={styles.cardCategory}>{category}</span>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
    </div>
  )
})

export default TitleBand


