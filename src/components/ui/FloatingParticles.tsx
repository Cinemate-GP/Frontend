'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

const FloatingParticles = ({ count = 15 }: { count?: number }) => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = [
      'rgba(var(--primary-rgb), 0.6)',
      'rgba(59, 130, 246, 0.4)',
      'rgba(139, 69, 255, 0.4)',
      'rgba(16, 185, 129, 0.4)',
      'rgba(245, 101, 101, 0.4)',
      'rgba(251, 191, 36, 0.4)',
    ]

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))

    setParticles(newParticles)
  }, [count])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0.7, 1, 0],
            scale: [0.5, 1, 0.8, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles
