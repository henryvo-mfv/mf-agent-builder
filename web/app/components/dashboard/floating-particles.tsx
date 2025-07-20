import React from 'react'
import styles from './animations.module.css'

type FloatingParticlesProps = {
  count?: number
  className?: string
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 8, className = '' }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2, // 2-8px
    left: Math.random() * 100, // 0-100%
    top: Math.random() * 100, // 0-100%
    delay: Math.random() * 10, // 0-10s delay
    duration: Math.random() * 8 + 12, // 12-20s duration
    opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5 opacity
  }))

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`absolute rounded-full bg-white ${styles.animateFloat}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles
