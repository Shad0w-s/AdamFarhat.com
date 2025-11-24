'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { useTilt } from '@/hooks/useTilt'

interface FloatingCardProps {
  children: ReactNode
  className?: string
  parallaxDistance?: number
  index?: number
}

export default function FloatingCard({
  children,
  className = '',
  parallaxDistance = 50,
  index = 0,
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  
  // Add slight randomness or variation based on index
  const distance = parallaxDistance * (index % 2 === 0 ? 1 : 0.5)
  const y = useTransform(scrollYProgress, [0, 1], [0, -distance])
  
  const { style: tiltStyle, onMouseMove, onMouseLeave } = useTilt()

  return (
    <motion.div
      ref={ref}
      style={{ y, ...tiltStyle } as any}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}

