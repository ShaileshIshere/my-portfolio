'use client'

import React from 'react'
import MagnetButton from '@/components/MagnetButton'

interface BurgerButtonProps {
  isActive: boolean
  onClick: () => void
}

export default function BurgerButton({ isActive, onClick }: BurgerButtonProps) {
  return (
    <MagnetButton
      onClick={onClick}
      width="6rem"
      height="6rem"
      position="fixed"
      className="right-5 top-5 z-50 bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300"
      magneticStrength={30}
      magneticContentStrength={45}
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
    </MagnetButton>
  )
}