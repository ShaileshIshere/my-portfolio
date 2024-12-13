"use client"

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { Bebas_Neue, Lobster } from 'next/font/google';
import styles from './CreativityText.module.css';

const Bebas_Neue_Font = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue'
})
const Lobster_Font = Lobster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lobster'
})

const Home = () => {
  const portfolioWrapperRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsBrowser(true);
    
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        lenisRef.current = new Lenis({
          smoothWheel: true,
          wheelMultiplier: 0.8,
          lerp: 0.1,
          syncTouch: true
        });

        const preloadImages = () => {
          if (portfolioWrapperRef.current) {
            const portfolioBG = portfolioWrapperRef.current.querySelectorAll('div[id*="portfolio-bg-"]');
            const imageCache = new Map();
            
            portfolioBG.forEach(bg => {
              const url = window.getComputedStyle(bg).backgroundImage.slice(5, -2);
              if (!imageCache.has(url)) {
                const img = new Image();
                img.src = url;
                imageCache.set(url, img);
              }
            });
          }
        };

        window.addEventListener('load', preloadImages);

        lenisRef.current.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenisRef.current?.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        if (portfolioWrapperRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: portfolioWrapperRef.current,
              start: 'top top',
              end: '+=150%',
              scrub: 0.5,
              pin: true,
              pinSpacing: false,
              fastScrollEnd: true,
              preventOverlaps: true
            }
          });

          // First parallax layer
          const bg1 = document.querySelector('#portfolio-bg-1');
          if (bg1) {
            tl.to(bg1, {
              y: -15 * parseFloat(bg1.getAttribute('data-speed') || '0'),
              duration: 1,
              force3D: true,
              ease: "none"
            }, 0);
          }

          // First line text - fastest scroll speed
          const mainText = document.querySelector('#main-text');
          if (mainText) {
            tl.to(mainText, {
              y: 250,  // Moves down faster
              duration: 1,
              force3D: true,
              ease: "none"
            }, 0);
          }

          // Second line text - medium scroll speed
          const secondText = document.querySelector('#second-text');
          if (secondText) {
            tl.to(secondText, {
              y: 150,  // Moves down medium speed
              duration: 1,
              force3D: true,
              ease: "none"
            }, 0);
          }

          // Creativity text - slowest scroll speed
          const creativityText = document.querySelector('#creativity-text');
          if (creativityText) {
            tl.to(creativityText, {
              y: 50,  // Moves down slowest
              duration: 1,
              force3D: true,
              ease: "none"
            }, 0);
          }

          // Background layers (2-4)
          for(let i = 2; i <= 4; i++) {
            const bg = document.querySelector(`#portfolio-bg-${i}`);
            if (bg) {
              tl.to(bg, {
                y: -15 * parseFloat(bg.getAttribute('data-speed') || '0'),
                duration: 1,
                force3D: true,
                ease: "none"
              }, 0);
            }
          }

          // Middle layers (5-7)
          for(let i = 5; i <= 7; i++) {
            const bg = document.querySelector(`#portfolio-bg-${i}`);
            if (bg) {
              tl.to(bg, {
                y: -35 * parseFloat(bg.getAttribute('data-speed') || '0'),
                duration: 1,
                force3D: true,
                ease: "none"
              }, 0);
            }
          }

          // Foreground layers (8-9)
          for(let i = 8; i <= 9; i++) {
            const bg = document.querySelector(`#portfolio-bg-${i}`);
            if (bg) {
              tl.to(bg, {
                y: -50 * parseFloat(bg.getAttribute('data-speed') || '0'),
                duration: 1,
                force3D: true,
                ease: "none"
              }, 0);
            }
          }
        }

        const handleResize = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('load', preloadImages);
        };
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  if (!mounted || !isBrowser) {
    return null;
  }

  return (
    <section id="home" className="relative min-h-[100dvh] md:mb-[90vh]">
      <div 
        id="mobile-hero" 
        className="hidden w-full h-[100dvh] absolute top-0 left-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/parallax-dark/updated-parallax.jpg")' }}
      >
        <div className='absolute top-[40vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-2 text-start'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${Bebas_Neue_Font.className} text-white text-[15vw] font-bold leading-[1]`}
          >
            Solving problems with <span className="text-outline-thin">precision</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${Bebas_Neue_Font.className} text-white text-[15vw] font-bold leading-[1] mt-10`}
          >
            <span className="text-outline-thin">passion</span>, and a touch of
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`${styles.animatedGradient} ${Lobster_Font.className} text-[#3B82F6] text-[12vw] font-bold mt-5`}
          >
            Creativity
          </motion.div>
        </div>
      </div>
      <div 
        ref={portfolioWrapperRef}
        id="portfolio-wrapper" 
        className="w-full h-[100dvh] absolute pointer-events-none z-0"
      >
        {/* First parallax layer */}
        <div
          id="portfolio-bg-1"
          data-speed="0.3"
          className="absolute top-[-10vh] left-[-10%] z-[1] w-[120%] h-[120vh] 
            bg-cover bg-center bg-no-repeat
            will-change-transform translate-z-0 backface-hidden 
            transition-none overflow-hidden"
          style={{ backgroundImage: 'url("/parallax-dark/parallax0.png")' }}
        />

        {/* First line text */}
        <div 
          id="main-text"
          className="absolute top-[6%] lg:top-[3%] left-[45%] w-3/4 -translate-x-1/2 z-[1] text-right uppercase will-change-transform leading-[1] lg:leading-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${Bebas_Neue_Font.className} text-white text-[10vw] lg:text-[6vw] font-bold`}
          >
            Solving problems with <span className="text-outline-thin">precision</span>
          </motion.div>
        </div>

        {/* Second line text - adjusted z-index */}
        <div 
          id="second-text"
          className="absolute top-[30%] lg:top-[20%] left-[57%] lg:left-[45%] w-1/2 lg:w-3/4 -translate-x-1/2 z-[3] text-right uppercase will-change-transform leading-[1] lg:leading-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${Bebas_Neue_Font.className} text-white text-[10vw] lg:text-[5vw] mt-4 font-bold`}
          >
            <span className="text-outline-thin">passion</span>, and a touch of
          </motion.div>
        </div>

        {/* Creativity text - adjusted z-index and position */}
        <div
          id="creativity-text"
          className="absolute top-[54%] lg:top-[36%] left-[40%] w-3/4 -translate-x-1/2 z-[8] text-right will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`${styles.animatedGradient} ${Lobster_Font.className} text-[8vw] lg:text-[4vw] font-bold`}
          >
            Creativity
          </motion.div>
        </div>

        {/* Parallax layers with adjusted z-indices */}
        {[2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            id={`portfolio-bg-${num}`}
            data-speed={(() => {
              const speeds = {
                2: 0.6, 3: 1.8, 4: 2.7, 5: 3.8, 
                6: 4.6, 7: 5.8, 8: 7, 9: 12
              };
              return speeds[num as keyof typeof speeds];
            })()}
            className={`
              absolute top-[-10vh] left-[-10%] 
              ${num <= 4 ? 'z-[2]' : num <= 7 ? 'z-[7]' : 'z-[8]'}
              w-[120%] h-[120vh] 
              bg-cover bg-center bg-no-repeat
              will-change-transform translate-z-0 backface-hidden 
              transition-none overflow-hidden
              ${num === 9 ? 'top-[25vh] scale-105 bg-contain !w-full !left-0' : ''}
            `}
            style={{ backgroundImage: `url('/parallax-dark/parallax${num - 1}.png')` }}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;