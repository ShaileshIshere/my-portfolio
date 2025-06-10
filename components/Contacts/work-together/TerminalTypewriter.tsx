"use client"

import { motion } from "framer-motion"
import { Bebas_Neue } from "next/font/google"
import { useState, useEffect } from "react"

const Bebas_Neue_Font = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
})

// Variation 5: Terminal Typewriter - One Line
export function TerminalTypewriter() {
  const [displayText, setDisplayText] = useState("")
  const [showPrompt, setShowPrompt] = useState(true)
  const fullText = "Let's Work Together"
  const commands = ["echo", "print", "say"]
  const [currentCommand] = useState(commands[Math.floor(Math.random() * commands.length)])

  useEffect(() => {
    // First show the command
    setTimeout(() => {
      let i = 0
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText(fullText.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
          setShowPrompt(false)
        }
      }, 80)
    }, 1000)
  }, [])

  return (
    <div className="text-center mb-12 md:mb-20">
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto mb-8 border border-green-500/30">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-green-400 text-sm font-mono ml-4">terminal</span>
        </div>

        <div className="font-mono text-left">
          <div className="text-green-400 mb-2">
            <span className="text-blue-400">user@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-purple-400">~</span>
            <span className="text-white">$ </span>
            <span className="text-yellow-400">{currentCommand}</span>
            <span className="text-white"> &quot;</span>
            <span className={`${Bebas_Neue_Font.className} text-white text-2xl md:text-4xl uppercase`}>
              {displayText}
            </span>
            <span className="text-white">&quot;</span>
            {showPrompt && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                className="text-green-400 ml-1"
              >
                ▋
              </motion.span>
            )}
          </div>

          {displayText === fullText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-green-400"
            >
              <div className="mb-2">
                <span className="text-blue-400">user@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-purple-400">~</span>
                <span className="text-white">$ </span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className="text-green-400"
                >
                  ▋
                </motion.span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
