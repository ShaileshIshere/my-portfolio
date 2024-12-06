'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { slide } from '@/lib/animations'

interface NavLinkProps {
  data: {
    title: string
    href: string
    index: number
  }
  isActive: boolean
  isMenuOpen: boolean
}

export default function NavLink({ data, isActive, isMenuOpen }: NavLinkProps) {
  const { title, href, index } = data
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      x.set((mouseX - centerX) * 0.2)
      y.set((mouseY - centerY) * 0.2)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div 
      ref={ref}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center group w-fit"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          x: isMenuOpen ? 0 : -50,
          transition: { duration: 0.5, delay: index * 0.1 }
        }}
        className="relative"
      >
        <div className="relative">
          <motion.div
            style={{
              x: xSpring,
              y: ySpring,
            }}
            className="relative"
          >
            <a 
              href={href}
              onClick={handleClick}
              className={`
                relative block text-[#999999] text-[3.5rem]
                transition-colors duration-300
                group-hover:text-white
                ${isActive ? 'text-white' : ''}
                cursor-pointer
              `}
            >
              {title}
            </a>
          </motion.div>
          {isHovered && (
            <motion.div
              layoutId="navCircle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[-3rem] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white"
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}