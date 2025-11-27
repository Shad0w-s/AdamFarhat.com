'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplineBackground from './SplineBackground'

const suffixes = [
  'AI in "boring" industries',
  'how constraints create better engineering',
  'engineering that feels invisible but works flawlessly',
  "interfaces that disappear when you're using them",
  'why simple products are the hardest to make',
  'the craft of making complex ideas feel simple',
  'optimization done one small improvement at a time',
  'the power of compounding',
  'how small constraints unlock creative solutions',
  'US business history',
  'Cold War history',
  'cooking',
  'how different kinds of intelligence reinforce each other',
  'learning from people who thought differently across eras',
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Start with random index
    setCurrentIndex(Math.floor(Math.random() * suffixes.length))
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % suffixes.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [mounted])

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-6 md:px-20 lg:px-24 xl:px-32 py-20 md:py-32 overflow-hidden">
      {/* Spline 3D Background */}
      <SplineBackground />

      <div className="relative z-10 text-left max-w-5xl w-full">
        <h1 className="text-display font-display font-bold mb-8 md:mb-12 leading-[0.95]">
          a student founder curious about…
        </h1>
        <div className="h-16 md:h-20 lg:h-24 flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-display-sm font-display font-bold text-foreground block"
            >
              {suffixes[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

