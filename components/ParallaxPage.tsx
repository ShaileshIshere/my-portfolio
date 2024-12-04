"use client"

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

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

  return (
    <>
      <section id="hero" className="relative min-h-[100dvh]">
        <div 
          id="mobile-hero" 
          className="hidden w-full h-[100dvh] absolute top-0 left-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/parallax/keyart-mobile.png")' }}
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
                ${num === 9 ? 'top-[25vh] bg-contain !w-full !left-0' : ''}
              `}
              style={{ backgroundImage: `url('/parallax/parallax${num - 1}.png')` }}
            />
          ))}
        </div>
      </section>
      <div 
        className="
          h-[200vh] relative z-[1]
          bg-gradient-to-b from-[#210002] via-[#210002] to-black
          mt-[90vh] max-md:mt-0 max-md:h-[100vh]
        "
      />
    </>
  );
};

export default ParallaxPage;
