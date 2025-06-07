'use client'
import { motion } from 'framer-motion'

interface ModernLoadingProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dots' | 'spinner' | 'pulse'
  className?: string
}

const ModernLoading = ({ 
  size = 'md', 
  variant = 'dots', 
  className = '' 
}: ModernLoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  const containerSizeClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3'
  }

  if (variant === 'dots') {
    return (
      <div className={`flex justify-center items-center ${containerSizeClasses[size]} ${className}`}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${sizeClasses[size]} bg-primary rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'spinner') {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} border-2 border-primary/30 border-t-primary rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} bg-primary rounded-full`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    )
  }

  return null
}

export default ModernLoading
