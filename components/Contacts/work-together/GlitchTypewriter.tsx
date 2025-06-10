"use client"

import { motion } from "framer-motion"
import { Bebas_Neue, Sulphur_Point } from "next/font/google"
import { useState, useEffect } from "react"

const Bebas_Neue_Font = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
})

const Sulphur_Point_Font = Sulphur_Point({
  weight: "300",
  subsets: ["latin"],
})

// Variation 2: Glitch Typewriter - One Line
export function GlitchTypewriter() {
  const [displayText, setDisplayText] = useState("")
  const [isGlitching, setIsGlitching] = useState(false)
  const fullText = "Let's Work Together"
  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        // Random glitch effect
        if (Math.random() < 0.3) {
          setIsGlitching(true)
          const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
          setDisplayText(fullText.slice(0, i) + glitchChar)
          setTimeout(() => {
            setDisplayText(fullText.slice(0, i + 1))
            setIsGlitching(false)
            i++
          }, 100)
        } else {
          setDisplayText(fullText.slice(0, i + 1))
          i++
        }
      } else {
        clearInterval(timer)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center mb-12 md:mb-20">
      <div
        className={`${Bebas_Neue_Font.className} text-[15vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] uppercase font-bold mb-4`}
      >
        <div className="relative inline-block">
          <motion.span
            className="text-white relative"
            animate={
              isGlitching
                ? {
                    x: [0, -2, 2, 0],
                    textShadow: [
                      "0 0 0 transparent",
                      "2px 0 0 #ff0000, -2px 0 0 #00ffff",
                      "-2px 0 0 #ff0000, 2px 0 0 #00ffff",
                      "0 0 0 transparent",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.1 }}
          >
            {displayText}
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
            className="text-red-500 ml-1 text-[0.8em]"
          >
            █
          </motion.span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: displayText === fullText ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 3 }}
        className={`${Sulphur_Point_Font.className} text-lg md:text-xl text-white/70 max-w-2xl mx-auto`}
      >
        <motion.span
          animate={
            displayText === fullText
              ? {
                  opacity: [1, 0.8, 1],
                }
              : {}
          }
          transition={{
            duration: 0.1,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          Ready to bring your ideas to life? Let&apos;s create something amazing together.
        </motion.span>
      </motion.p>
    </div>
  )
}
