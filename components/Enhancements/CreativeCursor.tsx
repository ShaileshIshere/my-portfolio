'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CreativeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trails = Array.from({ length: 3 }).map((_, i) => {
      const trail = document.createElement('div');
      trail.className = `fixed w-8 h-8 border border-white rounded-full pointer-events-none z-[98] opacity-${(3-i)*20}`;
      document.body.appendChild(trail);
      trailsRef.current.push(trail);
      return trail;
    });

    const moveCursor = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if cursor is over projects gallery
      const target = e.target as HTMLElement;
      const isInProjectsGallery = target.closest('.projects-gallery') !== null;

      if (isInProjectsGallery !== isHiddenRef.current) {
        isHiddenRef.current = isInProjectsGallery;
        gsap.to([cursor, ...trails], {
          duration: 0.2,
          opacity: isInProjectsGallery ? 0 : 1,
          ease: "power2.out"
        });
      }

      if (!isInProjectsGallery) {
        gsap.to(cursor, {
          duration: 0.15,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          ease: "power2.out"
        });

        // Animate trails with delay
        trails.forEach((trail, index) => {
          gsap.to(trail, {
            duration: 0.5,
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            delay: index * 0.08,
            ease: "power2.out"
          });
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isHiddenRef.current) return;

      const target = e.target as HTMLElement;
      const isClickable = target.tagName.toLowerCase() === 'a' || 
                         target.tagName.toLowerCase() === 'button' ||
                         target.onclick !== null ||
                         target.closest('a, button') !== null;
      
      if (isClickable) {
        gsap.to(cursor, {
          duration: 0.3,
          scale: 1.5,
          ease: "power2.out"
        });
        gsap.to(trails, {
          duration: 0.3,
          scale: 1.2,
          stagger: 0.05,
          ease: "power2.out"
        });
      } else {
        gsap.to([cursor, ...trails], {
          duration: 0.3,
          scale: 1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      trails.forEach(trail => trail.remove());
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="hidden md:block fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[99]"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}