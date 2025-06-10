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

// Variation 3: Neon Typewriter - One Line
export function NeonTypewriter() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "Let's Work Together"

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, fullText])

  return (
    <div className="text-center mb-12 md:mb-20">
      <div
        className={`${Bebas_Neue_Font.className} text-[15vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] uppercase font-bold mb-4`}
      >
        <div className="relative inline-block">
          <span
            className="text-white"
            style={{
              textShadow:
                "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)",
            }}
          >
            {displayText}
          </span>
          <motion.span
            animate={{
              opacity: [1, 0],
              boxShadow: [
                "0 0 5px rgba(59, 130, 246, 1)",
                "0 0 10px rgba(59, 130, 246, 0.5)",
                "0 0 5px rgba(59, 130, 246, 1)",
              ],
            }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block w-1 h-[0.8em] bg-blue-400 ml-1 align-middle"
          />
        </div>
      </div>

      {/* Neon underline effect */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: displayText.length > 0 ? `${(displayText.length / fullText.length) * 100}%` : "0%" }}
        transition={{ duration: 0.3 }}
        className="h-1 bg-blue-400 max-w-md mx-auto mb-6 rounded-full"
        style={{
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6)",
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: displayText === fullText ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className={`${Sulphur_Point_Font.className} text-lg md:text-xl text-white/70 max-w-2xl mx-auto`}
        style={{
          textShadow: displayText === fullText ? "0 0 5px rgba(255, 255, 255, 0.3)" : "none",
        }}
      >
        Ready to bring your ideas to life? Let&apos;s create something amazing together.
      </motion.p>
    </div>
  )
}
