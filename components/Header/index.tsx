'use client'

import React, { useState } from 'react'
import BurgerButton from './BurgerButton'
import Nav from '../Nav'

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <>
      <BurgerButton 
        isActive={isNavOpen} 
        onClick={toggleNav} 
      />
      <Nav
        isOpen={isNavOpen} 
        onClose={() => setIsNavOpen(false)} 
      />
    </>
  )
}