"use client"

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import MagnetButton from './MagnetButton';

const ParallaxPage = () => {
  const portfolioWrapperRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const timer = setTimeout(() => {
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

        // Background layers (1-4)
        for(let i = 1; i <= 4; i++) {
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
    }, 0);

    return () => {
      clearTimeout(timer);
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 100 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div>
      <section id="hero" className="relative min-h-[100dvh]">
        <div 
          id="mobile-hero" 
          className="hidden w-full h-[100dvh] absolute top-0 left-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/parallax-dark/updated-parallax.jpg")' }}
        />
        <div 
          ref={portfolioWrapperRef}
          id="portfolio-wrapper" 
          className="w-full h-[100dvh] absolute pointer-events-none z-0"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div
              key={num}
              id={`portfolio-bg-${num}`}
              data-speed={(() => {
                const speeds = {
                  1: 0.3, 2: 0.6, 3: 1.8, 4: 2.7, 5: 3.8, 
                  6: 4.6, 7: 5.8, 8: 7, 9: 12
                };
                return speeds[num as keyof typeof speeds];
              })()}
              className={`
                absolute top-[-10vh] left-[-10%] z-0 w-[120%] h-[120vh] 
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

      <div 
        className="
          h-[200vh] relative z-[1]
          bg-gradient-to-b from-[#001731] from-0% via-[#001731] via-25% to-black to-65%
          mt-[90vh] max-md:mt-0 max-md:h-[100vh]
        "
      >
        <div className='relative w-[70%] left-[15%] flex flex-col items-center'>
          <section className='w-full h-fit-content relative flex justify-center'>
            <p className='text-[3vw] text-white leading-[1] font-thin -mt-32'>
              I believe in coding with purpose and precision. Every project is an opportunity to push boundaries, solve problems, and create experiences that matter. With a passion for collaboration and continuous learning, I aim to stay ahead of the curve, delivering work that&apos;s not just cutting-edge but also meaningful to its users.
            </p>
          </section>

          <div className="w-full relative mt-20 border-b-[1px] border-gray-600 mb-[7vh]">
            <p className="italic text-gray-400 ml-1">About me.</p>
          </div>

          <section className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full relative max-w-5xl gap-10">
            <div 
              className="text-center lg:text-left w-fit mt-12"
              onClick={() => {
                window.open("https://github.com/ShaileshIshere", "_blank");
              }}
            >
              <MagnetButton />
            </div>

            <motion.div className="w-full lg:w-1/2 text-center text-white font-light text-[24px] lg:text-left leading-[32px]">
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hello World! I&apos;m Shailesh Kandari, a dedicated full-stack developer passionate about creating innovative and scalable solutions. I thrive in collaborative environments where ideas flourish, and teamwork brings concepts to life. With expertise in React, Node.js, Next.js.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                I focus on crafting user-centric applications that deliver meaningful experiences. Outside of coding, I&apos;m constantly expanding my knowledge and staying on the cutting edge of emerging technologies to build for the future.
              </motion.p>
            </motion.div>
          </section>

          <div className="w-full relative mt-52 mb-40">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[64px] text-white mb-32 font-light"
            >
              I can help you with
              <motion.div className="inline-flex">
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    animate={{
                      opacity: [
                        0,
                        ...(Array(index).fill(0)),
                        ...Array(3 - index).fill(1),
                        0
                      ],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.2, 0.4, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 0.3
                    }}
                    className="inline-block"
                  >
                    .
                  </motion.span>
                ))}
              </motion.div>
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-24 cursor-pointer"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {[
                { number: "01", title: "Design", content: "With a solid track record in designing websites, I deliver strong and user-friendly digital designs. (Since 2024 only in combination with development)" },
                { number: "02", title: "Development", content: "I build scalable websites from scratch that fit seamlessly with design. My focus is on micro animations, transitions and interaction. Building with React, Next.js, and modern web technologies." },
                { number: "03", title: "The full package", content: "A complete website from concept to implementation, that's what makes me stand out. My great sense for design and my development skills enable me to create kick-ass projects." }
              ].map((item, index) => (
                <motion.div 
                  key={item.number}
                  className="flex flex-col"
                  variants={itemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <span className="text-[#696969] mb-6 text-xl">{item.number}</span>
                  <h3 className="text-[40px] text-white mb-8 font-light">
                    {item.title === "The full package" && (
                      <motion.span 
                        className="inline-block mr-3"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        ✦
                      </motion.span>
                    )}
                    {item.title}
                  </h3>
                  <p className="text-[#696969] text-xl leading-relaxed">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxPage;
