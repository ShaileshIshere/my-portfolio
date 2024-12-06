'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menuSlide } from '@/lib/animations'
import Curve from '../Curve'
import NavLink from './NavLink'
import MagneticLink from './MagneticLink'

interface NavItem {
  title: string
  href: string
}

const navItems: NavItem[] = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Work", href: "#work" },
  { title: "Contact", href: "#contact" }
]

const socialLinks = [
  "Discord",
  "Instagram",
  "Twitter / X",
  "LinkedIn"
]

interface NavProps {
  isOpen: boolean
  onClose: () => void
}

export default function Nav({ isOpen, onClose }: NavProps) {
  const [activeSection, setActiveSection] = React.useState("home")

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "work", "contact"]
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          variants={menuSlide}
          initial="initial"
          animate="enter"
          exit="exit"
          className="fixed right-0 top-0 h-screen w-[30%] min-w-[300px] bg-[#000D1B] text-white z-40"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <Curve />
          <div className="box-border h-full p-28 flex flex-col justify-between">
            <div>
              <div className="text-[0.875rem] tracking-widest uppercase text-[#999999] mb-10 pb-5 border-b-[1px] border-gray-400 w-full">Navigation</div>
              <div className="flex flex-col gap-5">
                {navItems.map((item, index) => (
                  <NavLink 
                    key={item.href} 
                    data={{...item, index}} 
                    isActive={activeSection === item.href.substring(1)}
                    isMenuOpen={isOpen}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-[0.875rem] tracking-widest uppercase text-[#999999] mb-8">Socials</div>
              <div className="flex gap-10">
                {socialLinks.map((link) => (
                  <MagneticLink 
                    key={link} 
                    href="#"
                  >
                    {link}
                  </MagneticLink>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}