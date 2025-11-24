'use client'

import styles from './stackedCards.module.css'

interface CardCTAProps {
  color: string
}

export default function CardCTA({ color }: CardCTAProps) {
  return (
    <div className={styles.cardCTA} aria-hidden="true">
      <svg
        className={styles.cardArrow}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 32L32 16M16 16H32V32"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}


