"use client"

import { motion } from "framer-motion"
import { Bebas_Neue, Sulphur_Point } from "next/font/google"
import { useState, useEffect, useMemo } from "react"

const Bebas_Neue_Font = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
})

const Sulphur_Point_Font = Sulphur_Point({
  weight: "300",
  subsets: ["latin"],
})

// Variation 6: Word by Word Typewriter - One Line
export function WordByWordTypewriter() {
  const [displayWords, setDisplayWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = useMemo(() => [
    "Let's",
    "bring",
    "your",
    "vision",
    "to",
    "life",
    "together."
  ], []);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayWords((prev) => [...prev, words[currentWordIndex]])
        setCurrentWordIndex(currentWordIndex + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [currentWordIndex, words])

  return (
    <div className="text-center mb-12 md:mb-20">
      <div
        className={`${Bebas_Neue_Font.className} text-[15vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] uppercase font-bold mb-4`}
      >
        <div className="relative inline-block">
          {displayWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              className={`inline-block mr-4 ${
                index === 0 ? "text-blue-400" : index === 1 ? "text-purple-400" : "text-white"
              }`}
              style={{
                textShadow: `0 0 20px ${
                  index === 0 ? "rgba(59,130,246,0.6)" : index === 1 ? "rgba(168,85,247,0.6)" : "rgba(255,255,255,0.3)"
                }`,
              }}
            >
              {word}
            </motion.span>
          ))}
          {currentWordIndex < words.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="text-white ml-1"
            >
              |
            </motion.span>
          )}
        </div>
      </div>

      {/* Animated particles for each word */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {displayWords.map((_, wordIndex) => (
          <div key={wordIndex}>
            {Array.from({ length: 5 }).map((_, particleIndex) => (
              <motion.div
                key={`${wordIndex}-${particleIndex}`}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: wordIndex * 0.8 + particleIndex * 0.1,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: displayWords.length === words.length ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 3 }}
        className={`${Sulphur_Point_Font.className} text-lg md:text-xl text-white/70 max-w-2xl mx-auto`}
      >
        Ready to bring your ideas to life? Let&apos;s create something amazing together.
      </motion.p>
    </div>
  )
}
