'use client'

import { type CSSProperties, useMemo, useState, useCallback } from 'react'
import Card from './Card'
import styles from './stackedCards.module.css'
import { CardData } from './cardTypes'
import type { ScrollPhaseState } from './useScrollPhase'

const DEFAULT_TITLE_HEIGHT = 148

interface StackedCardsProps {
  cards: CardData[]
  stickyTop?: number
}

type PhaseSnapshotMap = Record<string, ScrollPhaseState>

export default function StackedCards({ cards, stickyTop = 104 }: StackedCardsProps) {
  const orderedCards = useMemo(() => cards ?? [], [cards])
  const totalCards = orderedCards.length

  const [titleHeights, setTitleHeights] = useState<Record<string, number>>({})
  const [phaseSnapshots, setPhaseSnapshots] = useState<PhaseSnapshotMap>({})

  const registerTitleHeight = useCallback((cardId: string, height: number) => {
    setTitleHeights((prev) => {
      const previous = prev[cardId]
      if (previous && Math.abs(previous - height) < 1) {
        return prev
      }
      return { ...prev, [cardId]: height }
    })
  }, [])

  const registerPhaseSnapshot = useCallback((cardId: string, snapshot: ScrollPhaseState) => {
    setPhaseSnapshots((prev) => {
      const previous = prev[cardId]
      if (
        previous &&
        previous.phase === snapshot.phase &&
        Math.abs(previous.coverProgress - snapshot.coverProgress) < 0.01 &&
        Math.abs(previous.slowOffset - snapshot.slowOffset) < 0.5
      ) {
        return prev
      }
      return { ...prev, [cardId]: snapshot }
    })
  }, [])

  if (totalCards === 0) {
    return null
  }

  const containerStyle = {
    ['--stacked-card-top' as '--stacked-card-top']: `${stickyTop}px`,
  } as CSSProperties

  return (
    <div
      className={styles.stackContainer}
      style={containerStyle}
    >
      {orderedCards.map((card, index) => {
        // Get slow scroll transform from previous card's phase
        // This creates the parallax effect where the previous card moves slower
        const previousCard = orderedCards[index - 1]
        const slowScrollTransform = previousCard
          ? phaseSnapshots[previousCard.id]?.slowOffset ?? 0
          : 0

        return (
          <Card
            key={card.id}
            card={card}
            index={index}
            totalCards={totalCards}
            zIndex={100 + index}
            stickyTop={stickyTop}
            slowScrollTransform={slowScrollTransform}
            onTitleHeightChange={(height) => registerTitleHeight(card.id, height)}
            onPhaseChange={(state) => registerPhaseSnapshot(card.id, state)}
          />
        )
      })}
    </div>
  )
}


