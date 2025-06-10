"use client"

import { Poiret_One, Sulphur_Point } from "next/font/google"
import { Twitter, Github, Linkedin, Instagram, Phone, Download } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { TypewriterHero } from "./work-together/TypewriterHero"

// const Bebas_Neue_Font = Bebas_Neue({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-bebas-neue",
// })

const Poiret_One_Font = Poiret_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poiret-one",
})

const Sulphur_Point_Font = Sulphur_Point({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-sulphur-point",
})

const Contacts = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effects for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

  const socials = [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/shailesh-kandari-a33112299/",
      icon: <Linkedin className="w-6 h-6 md:w-8 md:h-8" />,
    },
    {
      name: "GitHub",
      link: "https://github.com/ShaileshIshere",
      icon: <Github className="w-6 h-6 md:w-8 md:h-8" />,
    },
    {
      name: "Twitter",
      link: "https://x.com/_justShailesh",
      icon: <Twitter className="w-6 h-6 md:w-8 md:h-8" />,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/_justt.shailesh/",
      icon: <Instagram className="w-6 h-6 md:w-8 md:h-8" />,
    },
  ]

  const contactInfo = [
    {
      label: "Email",
      value: "contactshaileshkandari@gmail.com",
      href: "mailto:contactshaileshkandari@gmail.com",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Phone",
      value: "(+91) 8700425443",
      href: "tel:+918700425443",
      icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />,
    },
    {
      label: "Resume",
      value: "Download CV",
      href: "/single-page-resume.pdf", // Updated to match the actual filename
      icon: <Download className="w-5 h-5 md:w-6 md:h-6" />,
    },
  ]

  return (
    <div
      ref={containerRef}
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden -mt-[50vh] bg-gradient-to-b from-[#000c1a] via-[#001122] to-[#000000]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 right-20 w-24 h-24 md:w-36 md:h-36 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute bottom-32 left-1/3 w-20 h-20 md:w-28 md:h-28 bg-cyan-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                        `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Hero Text */}
        <TypewriterHero />
        {/* <GlitchTypewriter /> */}
        {/* <NeonTypewriter /> */}
        {/* <MatrixTypewriter /> */}
        {/* <TerminalTypewriter /> */}
        {/* <ClassicTypewriter /> */}
        {/* <WordByWordTypewriter /> */}

        {/* Contact Information Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20"
        >
          {contactInfo.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.href}
              target={contact.label === "Resume" ? "_blank" : undefined}
              rel={contact.label === "Resume" ? "noopener noreferrer" : undefined}
              className="group relative p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:bg-white/10"
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="text-blue-400 group-hover:text-white transition-colors">{contact.icon}</div>
                <span
                  className={`${Poiret_One_Font.className} text-sm md:text-base text-white/60 uppercase tracking-wider`}
                >
                  {contact.label}
                </span>
              </div>
              <p
                className={`${Sulphur_Point_Font.className} text-lg md:text-xl text-white group-hover:text-blue-400 transition-colors break-all md:break-normal`}
              >
                {contact.value}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3
            className={`${Poiret_One_Font.className} text-xl md:text-2xl text-white/60 uppercase tracking-wider mb-8`}
          >
            Connect With Me
          </h3>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-blue-400/50 transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <div className="text-white group-hover:text-blue-400 transition-colors">{social.icon}</div>

                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {social.name}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16 md:mt-24 pt-8 border-t border-white/10"
        >
          <p className={`${Sulphur_Point_Font.className} text-sm md:text-base text-white/40`}>
            © 2024 Shailesh Kandari. Crafted with passion and precision.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Contacts
