"use client"

import { useState, useEffect, useMemo } from "react"

// Variation 6: Word by Word Typewriter - One Line
export function WordByWordTypewriter() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayedWords, setDisplayedWords] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)

  // Use useMemo to ensure stable reference for words array
  const words = useMemo(
    () => [
      "Let's",
      "bring",
      "your",
      "vision",
      "to",
      "life",
      "together.",
    ],
    []
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentWordIndex < words.length) {
          setDisplayedWords([...displayedWords, words[currentWordIndex]])
          setCurrentWordIndex(currentWordIndex + 1)
        } else {
          setIsDeleting(true)
          setTimeout(() => {
            setIsDeleting(false)
            setCurrentWordIndex(0)
            setDisplayedWords([])
          }, 2000)
        }
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [currentWordIndex, displayedWords, isDeleting, words])

  return (
    <div className="text-center mb-20">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 relative inline-block">
        {displayedWords.join(" ")}
        <span className="animate-blink ml-1">|</span>
      </h2>
    </div>
  )
}
