'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card from './Card'
import { CardData } from './cardTypes'

gsap.registerPlugin(ScrollTrigger)

interface StackedCardsProps {
  cards: CardData[]
  stickyTop?: number
}

export default function StackedCards({ cards, stickyTop = 104 }: StackedCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const spacerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    if (cardElements.length === 0) return

    const ctx = gsap.context(() => {
      const scrollPerCard = window.innerHeight * 1.2
      const lastCardIndex = cardElements.length - 1

      cardElements.forEach((card, i) => {
        if (!card) return

        const remainingCards = cardElements.length - i - 1
        const cardHeight = card.offsetHeight
        const totalScrollNeeded = remainingCards * scrollPerCard

        // For the last card, it should scroll all the way to the bottom of the card
        // Since there are no remaining cards, it just needs to scroll through its own height
        // Then extend the pin slightly to keep it locked in place
        const isLastCard = i === lastCardIndex
        const endDistance = isLastCard
          ? cardHeight + window.innerHeight * 0.5 // Last card: scroll through full height, then lock
          : cardHeight + totalScrollNeeded

        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${stickyTop + i * 40}`,
          end: () => `+=${endDistance}`,
          pin: true,
          pinSpacing: false,
          id: `card-${i}`,
        })
      })

      // Set spacer height to account for all scroll distance
      // This ensures content below isn't covered by the pinned cards
      if (spacerRef.current) {
        const totalScrollDistance = lastCardIndex * scrollPerCard
        const lastCard = cardElements[lastCardIndex]
        const lastCardHeight = lastCard?.offsetHeight || 0
        
        // Calculate spacer height: total scroll distance + last card height + lock distance
        // Add a small buffer to ensure smooth transition to content below
        const lastCardLockDistance = window.innerHeight * 0.5
        const spacerHeight = totalScrollDistance + lastCardHeight + lastCardLockDistance + window.innerHeight * 0.2
        
        gsap.set(spacerRef.current, {
          height: spacerHeight,
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [cards, stickyTop])

  if (cards.length === 0) {
    return null
  }

  return (
    <>
      <div ref={containerRef} className="relative">
        <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-12">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              card={card}
              index={index}
            />
          ))}
        </div>
      </div>
      {/* Spacer to ensure content below isn't covered by pinned cards */}
      <div ref={spacerRef} style={{ height: '1px' }} aria-hidden="true" />
    </>
  )
}
