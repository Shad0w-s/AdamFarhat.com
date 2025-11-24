'use client'

import { forwardRef, useMemo } from 'react'
import Link from 'next/link'
import { CardData } from './cardTypes'
import TitleBand from './TitleBand'
import ContentBody from './ContentBody'
import CardCTA from './CardCTA'
import styles from './stackedCards.module.css'

interface CardProps {
  card: CardData
  index: number
}

/**
 * Determines text color based on background color for WCAG contrast
 */
function getContrastColor(backgroundColor: string): string {
  // Handle CSS variables
  if (backgroundColor.startsWith('var(') || backgroundColor.startsWith('--')) {
    return '#FFFFFF'
  }

  // Handle named colors
  const namedColors: Record<string, string> = {
    white: '#FFFFFF',
    black: '#000000',
    transparent: '#FFFFFF',
  }
  if (namedColors[backgroundColor.toLowerCase()]) {
    return namedColors[backgroundColor.toLowerCase()] === '#FFFFFF' ? '#000000' : '#FFFFFF'
  }

  // Remove # if present
  let hex = backgroundColor.replace('#', '')
  
  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }
  
  // Validate hex
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return '#FFFFFF'
  }

  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Calculate relative luminance (WCAG formula)
  const [rs, gs, bs] = [r, g, b].map(val => {
    val = val / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  const luminance = 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

/**
 * Card component - simplified for GSAP ScrollTrigger pinning
 * No complex scroll phase tracking needed - GSAP handles the pinning
 */
const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { card, index },
  ref
) {
  const textColor = useMemo(() => getContrastColor(card.colorTheme), [card.colorTheme])

  return (
    <div
      ref={ref}
      className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden relative"
      style={{ backgroundColor: card.colorTheme }}
    >
      <Link
        href={card.ctaUrl}
        className={styles.cardContainer}
        style={{
          backgroundColor: card.colorTheme,
          color: textColor,
        }}
        role="link"
        aria-label={`View project: ${card.title}`}
      >
        {/* Title Band - Persistent region */}
        <TitleBand
          year={card.year}
          category={card.category}
          title={card.title}
          textColor={textColor}
        />

        {/* Content Body - Coverable region */}
        <ContentBody
          heroImage={card.heroImage}
          title={card.title}
          index={index}
        />

        {/* CTA Arrow */}
        <CardCTA color={textColor} />
      </Link>
    </div>
  )
})

Card.displayName = 'Card'

export default Card
