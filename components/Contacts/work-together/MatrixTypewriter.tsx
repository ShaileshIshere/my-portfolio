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

// Variation 4: Matrix Typewriter - One Line
export function MatrixTypewriter() {
  const [displayText, setDisplayText] = useState("")
  const [matrixChars, setMatrixChars] = useState<string[]>([])
  const fullText = "Let's Work Together"
  const matrixCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*"

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        // Generate random characters for matrix effect
        const randomChars = Array.from(
          { length: fullText.length - i },
          () => matrixCharSet[Math.floor(Math.random() * matrixCharSet.length)],
        )
        setMatrixChars(randomChars)

        // Set the actual character after a brief delay
        setTimeout(() => {
          setDisplayText(fullText.slice(0, i + 1))
          i++
        }, 50)
      } else {
        clearInterval(timer)
        setMatrixChars([])
      }
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center mb-12 md:mb-20">
      <div
        className={`${Bebas_Neue_Font.className} text-[15vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] uppercase font-bold mb-4`}
      >
        <div className="relative inline-block font-mono">
          <span className="text-green-400">{displayText}</span>
          <span className="text-green-600/50">
            {matrixChars.map((char, index) => (
              <motion.span
                key={index}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.1, repeat: Number.POSITIVE_INFINITY }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            className="text-green-400 ml-1"
          >
            ▋
          </motion.span>
        </div>
      </div>

      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-sm font-mono"
            style={{ left: `${Math.random() * 100}%` }}
            animate={{
              y: [-20, window.innerHeight + 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            {matrixCharSet[Math.floor(Math.random() * matrixCharSet.length)]}
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: displayText === fullText ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 4 }}
        className={`${Sulphur_Point_Font.className} text-lg md:text-xl text-green-400/70 max-w-2xl mx-auto font-mono`}
      >
        {"> "}Ready to bring your ideas to life? Let&apos;s create something amazing together.
      </motion.p>
    </div>
  )
}
