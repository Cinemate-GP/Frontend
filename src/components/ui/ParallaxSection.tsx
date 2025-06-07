'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ParallaxSection
