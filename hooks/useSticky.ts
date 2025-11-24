import { useEffect, useState, RefObject } from 'react'

export function useSticky(ref: RefObject<HTMLElement>, offset = 0) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setIsSticky(rect.top <= offset)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, offset])

  return isSticky
}

