'use client'
import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observer.disconnect()
    }
  }, [threshold, rootMargin, hasIntersected])

  return {
    elementRef,
    isIntersecting,
    hasIntersected: triggerOnce ? hasIntersected : isIntersecting
  }
}

export default useIntersectionObserver
