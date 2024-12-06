'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticLinkProps {
  href: string
  children: React.ReactNode
}

export default function MagneticLink({ href, children }: MagneticLinkProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      x.set((mouseX - centerX) * 0.3)
      y.set((mouseY - centerY) * 0.3)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <motion.a
        href={href}
        style={{
          x: xSpring,
          y: ySpring,
        }}
        className={`
          text-[0.875rem] text-white block
          transition-colors duration-300
          ${isHovered ? 'text-white' : ''}
        `}
      >
        {children}
      </motion.a>
    </motion.div>
  )
}
