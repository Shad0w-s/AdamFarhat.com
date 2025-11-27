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
  
  // Only apply extra spacing in production
  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    if (cardElements.length === 0 || !stackRegionRef.current) return

    const ctx = gsap.context(() => {
      const scrollPerCard = window.innerHeight * 1.2
      const lastCardIndex = cardElements.length - 1
      
      // Stack region height = scroll distance for cards 1 and 2 to come in
      // This is exactly what's needed for the stack to form, no extra
      const stackRegionHeight = lastCardIndex * scrollPerCard

      // Set stack region height first
      gsap.set(stackRegionRef.current, {
        height: stackRegionHeight,
      })

      cardElements.forEach((card, i) => {
        if (!card) return

        const remainingCards = cardElements.length - i - 1
        const isLastCard = i === lastCardIndex

        if (isLastCard) {
          // Card 3: pin immediately with minimal end distance, use stack region as endTrigger
          // In production, end earlier to ensure button is always visible
          const endPosition = isProduction 
            ? `bottom-=${window.innerHeight * 0.3} bottom` // End 30vh earlier in production
            : 'bottom bottom'
          
          ScrollTrigger.create({
            trigger: card,
            start: `top top+=${stickyTop + i * 40}`,
            endTrigger: stackRegionRef.current!,
            end: endPosition,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            id: `card-${i}`,
          })
        } else {
          // Cards 1 and 2: stay pinned until stack region ends
          // This keeps them stacked but they'll unpin together when region ends
          ScrollTrigger.create({
            trigger: card,
            start: `top top+=${stickyTop + i * 40}`,
            endTrigger: stackRegionRef.current!,
            end: 'bottom bottom',
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            id: `card-${i}`,
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [cards, stickyTop])

  if (cards.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Stack region wrapper - provides exact scroll distance for cards to stack */}
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
      {/* Spacer to ensure content below is always visible - production only */}
      {isProduction && (
        <div className="h-[30vh]" aria-hidden="true" />
      )}
    </div>
  )
}
