import styles from './stackedCards.module.css'

interface CardCTAProps {
  color: string
}

export default function CardCTA({ color }: CardCTAProps) {
  return (
    <div className={styles.cardCTA}>
      <div className={styles.cardArrow} style={{ color }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
