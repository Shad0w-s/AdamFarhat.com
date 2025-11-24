'use client'

import Link from 'next/link'
import { CardData } from './cardTypes'
import TitleBand from './TitleBand'
import ContentBody from './ContentBody'
import CardCTA from './CardCTA'
import styles from './stackedCards.module.css'
import { type CSSProperties, useMemo, useRef, useEffect, useState } from 'react'
import { type ScrollPhaseState, useScrollPhase } from './useScrollPhase'

interface CardProps {
  card: CardData
  index: number
  totalCards: number
  zIndex: number
  stickyTop: number // y_ref: sticky reference line (same for all cards)
  slowScrollTransform?: number // Transform for slow scroll effect (from previous card's phase)
  onTitleHeightChange?: (height: number) => void
  onPhaseChange?: (state: ScrollPhaseState) => void
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

const DEFAULT_CARD_HEIGHT = 720
const DEFAULT_TITLE_HEIGHT = 148

/**
 * Card component with title band and content body separation
 * Title band (T_i) must remain visible, content body (B_i) can be covered
 */
export default function Card({
  card,
  index,
  totalCards,
  zIndex,
  stickyTop,
  slowScrollTransform = 0,
  onTitleHeightChange,
  onPhaseChange,
}: CardProps) {
  const textColor = useMemo(() => getContrastColor(card.colorTheme), [card.colorTheme])
  const titleBandRef = useRef<HTMLDivElement>(null)
  const cardWrapperRef = useRef<HTMLDivElement>(null)
  const cardContainerRef = useRef<HTMLAnchorElement>(null)
  const [dimensions, setDimensions] = useState({
    titleHeight: DEFAULT_TITLE_HEIGHT,
    cardHeight: DEFAULT_CARD_HEIGHT,
  })

  // Dynamically measure the title band and full card height so overlaps
  // clamp exactly at the band boundary.
  useEffect(() => {
    if (!cardContainerRef.current || !titleBandRef.current) {
      return
    }

    const cardElement = cardContainerRef.current
    const titleElement = titleBandRef.current

    const updateDimensions = () => {
      setDimensions({
        titleHeight: titleElement.offsetHeight || DEFAULT_TITLE_HEIGHT,
        cardHeight: cardElement.offsetHeight || DEFAULT_CARD_HEIGHT,
      })
    }

    updateDimensions()

    let resizeObserver: ResizeObserver | null = null
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => updateDimensions())
      resizeObserver.observe(cardElement)
      resizeObserver.observe(titleElement)
    }

    const handleResize = () => updateDimensions()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }

    return () => {
      resizeObserver?.disconnect()
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  const titleHeight = Math.max(dimensions.titleHeight, DEFAULT_TITLE_HEIGHT)
  const cardHeight = Math.max(dimensions.cardHeight, titleHeight + 240)
  const overlapAmount = Math.max(cardHeight - titleHeight, 0)
  // Use fixed viewport height for scroll space (110vh-120vh as per spec)
  const wrapperHeight = typeof window !== 'undefined' 
    ? window.innerHeight * 1.15 // ~115vh for scroll space
    : 800
  // Negative margin pulls next card up to overlap with previous card's body
  const overlapOffset = index > 0 ? -overlapAmount : 0
  // All cards stick at the same y_ref line - stickyOffset is NOT used for positioning
  const effectiveStickyTop = stickyTop

  useEffect(() => {
    onTitleHeightChange?.(titleHeight)
  }, [titleHeight, onTitleHeightChange])

  // Track scroll phase for this card
  // Reduced slowScrollRate to prevent excessive movement and glitches
  const [phaseRef, phaseState] = useScrollPhase({
    headerLineHeight: titleHeight,
    stickyTop: effectiveStickyTop,
    slowScrollRate: 0.25, // Reduced for smoother, less glitchy effect
    disabled: index === totalCards - 1, // Disable for last card
  })

  useEffect(() => {
    onPhaseChange?.(phaseState)
  }, [phaseState, onPhaseChange])

  // Apply slow scroll transform to create parallax effect
  // slowScrollTransform: from previous card (makes previous card move slower)
  // phaseState.slowOffset: this card's own slow movement as it gets covered
  // Transform on card container (not sticky container) to avoid breaking sticky behavior
  // Apply transform more liberally - even when locked, apply a small transform
  // This ensures movement is visible during scroll
  const shouldApplyTransform = phaseState.phase !== 'pre' && phaseState.phase !== 'post'
  const combinedTransform = shouldApplyTransform 
    ? (slowScrollTransform ?? 0) + phaseState.slowOffset
    : 0
  const cardTransform = Math.abs(combinedTransform) > 0.1
    ? `translate3d(0, ${combinedTransform}px, 0)`
    : undefined

  const wrapperStyle: CSSProperties = {
    zIndex,
    marginTop: `${overlapOffset}px`,
    height: `${wrapperHeight}px`,
  }

  const cardVariables: CSSProperties = {
    '--stacked-card-cover-progress': phaseState.coverProgress,
    '--stacked-card-title-height': `${titleHeight}px`,
  } as CSSProperties

  return (
    <div
      ref={cardWrapperRef}
      className={styles.cardWrapper}
      style={wrapperStyle}
    >
      <div 
        ref={phaseRef}
        className={styles.cardStickyContainer} 
        data-phase={phaseState.phase}
        style={{ 
          zIndex,
          top: `${effectiveStickyTop}px`,
        }}
      >
        <Link
          href={card.ctaUrl}
          ref={cardContainerRef}
          className={styles.cardContainer}
          style={{
            backgroundColor: card.colorTheme,
            color: textColor,
            transform: cardTransform,
            ...cardVariables,
          }}
          role="link"
          aria-label={`View project: ${card.title}`}
        >
          {/* Title Band - Persistent region (T_i) */}
          <TitleBand
            ref={titleBandRef}
            year={card.year}
            category={card.category}
            title={card.title}
            textColor={textColor}
          />

          {/* Content Body - Coverable region (B_i) */}
          <ContentBody
            heroImage={card.heroImage}
            title={card.title}
            index={index}
          />

          {/* CTA Arrow - positioned inline with title */}
          <CardCTA color={textColor} />
        </Link>
      </div>
    </div>
  )
}

