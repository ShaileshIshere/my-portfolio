'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface BurgerButtonProps {
  isActive: boolean
  onClick: () => void
}

export default function BurgerButton({ isActive, onClick }: BurgerButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect()
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
  }

  return (
    <motion.button 
      ref={buttonRef}
      onClick={onClick} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring
      }}
      className={`
        fixed right-5 top-5 z-50 w-20 h-20 rounded-full 
        bg-indigo-500 flex items-center justify-center cursor-pointer
        transition-colors duration-300 hover:bg-indigo-600
      `}
    >
      <div className={`
        relative w-8 h-4 flex items-center justify-center
        after:absolute after:block after:h-px after:w-full
        after:bg-white after:transition-all after:duration-500 after:ease-in-out after:bottom-0
        before:absolute before:block before:h-px before:w-full
        before:bg-white before:transition-all before:duration-500 before:ease-in-out before:top-0
        ${isActive ? 
          'before:rotate-[135deg] before:top-1/2 before:-translate-y-1/2 before:scale-x-75 after:-rotate-[135deg] after:top-1/2 after:-translate-y-1/2 after:scale-x-75' : 
          'before:scale-100 after:scale-100'
        }
      `} />
    </motion.button>
  )
}