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
  const stackRegionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    if (cardElements.length === 0 || !stackRegionRef.current) return

    const ctx = gsap.context(() => {
      const scrollPerCard = window.innerHeight * 1.2
      const lastCardIndex = cardElements.length - 1
      
      // Stack region height = scroll needed for all cards to stack (no extra)
      // This is exactly (cards.length - 1) * scrollPerCard
      const stackRegionHeight = lastCardIndex * scrollPerCard
      
      gsap.set(stackRegionRef.current, {
        height: stackRegionHeight,
      })

      cardElements.forEach((card, i) => {
        if (!card) return

        const remainingCards = cardElements.length - i - 1
        const isLastCard = i === lastCardIndex

        // End distance calculation:
        // - Cards 1 and 2: stay pinned while remaining cards scroll in
        // - Card 3 (last): minimal end distance - just pins in place, releases immediately
        // All cards unpin when the stack region ends
        const endDistance = isLastCard 
          ? 1 // Last card: pin and release immediately (no scroll required)
          : remainingCards * scrollPerCard // Other cards: stay pinned until all cards are stacked

        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${stickyTop + i * 40}`,
          end: () => `+=${endDistance}`,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          id: `card-${i}`,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [cards, stickyTop])

  if (cards.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Stack region - exact scroll distance for cards to stack, no extra space */}
      <div ref={stackRegionRef} className="relative">
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
    </div>
  )
}
