'use client'

import React, { useState, useEffect, useRef } from 'react'
import BurgerButton from './BurgerButton'
import Nav from '@/components/BurgerMenu/Nav'

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isNavOpen && 
        navRef.current && 
        buttonRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsNavOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNavOpen])

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <>
      <div ref={buttonRef}>
        <BurgerButton 
          isActive={isNavOpen} 
          onClick={toggleNav} 
        />
      </div>
      <div ref={navRef}>
        <Nav
          isOpen={isNavOpen} 
          onClose={() => setIsNavOpen(false)} 
        />
      </div>
    </>
  )
}