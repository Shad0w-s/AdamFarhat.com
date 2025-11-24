'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const suffixes = [
  'AI in "boring" industries',
  'seamless, intuitive UI / UX',
  'deceptively simple solutions',
  'solving hard problems with an arm tied behind my back',
  'US business history',
  'Cold War history',
  'cooking',
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
    <section className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-6 md:px-20 lg:px-24 xl:px-32 py-20 md:py-32">
      <div className="text-left max-w-5xl w-full">
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

