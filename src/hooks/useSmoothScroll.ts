'use client'
import { useEffect } from 'react'

export const useSmoothScroll = () => {
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return { scrollToSection, scrollToTop }
}

export default useSmoothScroll
