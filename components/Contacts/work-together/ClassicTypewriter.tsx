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

// Variation 1: Classic Typewriter - One Line
export function ClassicTypewriter() {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Let's Work Together"

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 2000)
      }
    }, 120)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center mb-12 md:mb-20">
      <div
        className={`${Bebas_Neue_Font.className} text-[15vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] uppercase font-bold text-white mb-4`}
      >
        <div className="relative inline-block">
          <span className="text-white">{displayText}</span>
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="text-blue-400 ml-1 text-[0.8em]"
            >
              |
            </motion.span>
          )}
        </div>
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: displayText.length > 0 ? "100%" : "0%" }}
        transition={{ duration: 0.5, delay: displayText === fullText ? 0.5 : 0 }}
        className="h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent max-w-md mx-auto mb-6"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: displayText === fullText ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className={`${Sulphur_Point_Font.className} text-lg md:text-xl text-white/70 max-w-2xl mx-auto`}
      >
        Ready to bring your ideas to life? Let&apos;s create something amazing together.
      </motion.p>
    </div>
  )
}
