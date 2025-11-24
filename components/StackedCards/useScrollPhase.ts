'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type ScrollPhase = 'pre' | 'locked' | 'covering' | 'residual' | 'post'

export interface ScrollPhaseState {
  phase: ScrollPhase
  coverProgress: number
  slowOffset: number
}

interface ScrollPhaseOptions {
  headerLineHeight: number
  stickyTop: number
  slowScrollRate?: number
  disabled?: boolean
}

const defaultState: ScrollPhaseState = {
  phase: 'pre',
  coverProgress: 0,
  slowOffset: 0,
}

export function useScrollPhase({
  headerLineHeight,
  stickyTop,
  slowScrollRate = 0.35,
  disabled = false,
}: ScrollPhaseOptions): [
  (node: HTMLDivElement | null) => void,
  ScrollPhaseState
] {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const stuckScrollYRef = useRef<number | null>(null)
  const [state, setState] = useState<ScrollPhaseState>(defaultState)

  const setRef = useCallback((node: HTMLDivElement | null) => {
    elementRef.current = node
    stuckScrollYRef.current = null // Reset when element changes
  }, [])

  useEffect(() => {
    if (disabled) {
      setState(defaultState)
      stuckScrollYRef.current = null
      return
    }

    let frame = 0

    const updatePhase = () => {
      const el = elementRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      
      // Get the card container inside the sticky container to measure actual card height
      const cardContainer = el.querySelector('[class*="cardContainer"]') as HTMLElement
      if (!cardContainer) return
      
      const cardHeight = cardContainer.offsetHeight || 1
      const overlapDistance = Math.max(cardHeight - headerLineHeight, 1)
      
      // Check if card is stuck (at sticky position)
      const isStuck = Math.abs(rect.top - stickyTop) < 5
      
      // Track scroll position when card first becomes stuck
      if (isStuck && stuckScrollYRef.current === null) {
        stuckScrollYRef.current = window.scrollY
      } else if (!isStuck) {
        stuckScrollYRef.current = null
      }
      
      // Calculate cover progress based on scroll distance since becoming stuck
      let coverProgress = 0
      if (isStuck && stuckScrollYRef.current !== null) {
        const scrollSinceStuck = Math.max(0, window.scrollY - stuckScrollYRef.current)
        coverProgress = Math.min(scrollSinceStuck / overlapDistance, 1)
      } else if (rect.top < stickyTop - 1) {
        // Card is past sticky position, calculate based on position
        const distancePastSticky = stickyTop - rect.top
        coverProgress = Math.min(distancePastSticky / overlapDistance, 1)
      } else if (Math.abs(rect.top - stickyTop) < 5) {
        // Card is at sticky position, check if we've scrolled since it became stuck
        if (stuckScrollYRef.current !== null) {
          const scrollSinceStuck = Math.max(0, window.scrollY - stuckScrollYRef.current)
          coverProgress = Math.min(scrollSinceStuck / overlapDistance, 1)
        }
      }

      let phase: ScrollPhase = 'pre'
      if (rect.top > stickyTop + 10) {
        // Card hasn't reached sticky position yet
        phase = 'pre'
      } else if (rect.bottom <= stickyTop + headerLineHeight) {
        // Card has scrolled past, only title band remains
        phase = 'post'
      } else if (coverProgress >= 0.95) {
        // Almost fully covered, only title band visible (lowered threshold from 0.98)
        phase = 'residual'
      } else if (coverProgress > 0 || isStuck) {
        // Trigger 'covering' even with tiny progress, or if stuck
        // This ensures movement is visible during scroll
        phase = 'covering'
      } else {
        phase = 'pre'
      }

      // Slow offset: as card gets covered, it moves slower (parallax effect)
      // Negative value means it moves up slower (lags behind) as it's being covered
      // This creates the parallax where the covered card appears to move slower
      // Reduced multiplier (0.3) prevents excessive movement that causes glitches
      const slowOffset = coverProgress > 0 
        ? -coverProgress * overlapDistance * slowScrollRate * 0.3
        : 0

      setState((prev) => {
        if (
          prev.phase === phase &&
          Math.abs(prev.coverProgress - coverProgress) < 0.01 &&
          Math.abs(prev.slowOffset - slowOffset) < 0.5
        ) {
          return prev
        }
        return { phase, coverProgress, slowOffset }
      })
    }

    const onScroll = () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }
      frame = window.requestAnimationFrame(updatePhase)
    }

    updatePhase()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [headerLineHeight, stickyTop, slowScrollRate, disabled])

  return [setRef, state]
}
