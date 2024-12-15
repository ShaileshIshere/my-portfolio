'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if cursor is over projects gallery
      const target = e.target as HTMLElement;
      const isInProjectsGallery = target.closest('.projects-gallery') !== null;

      // Update hidden state and cursor visibility
      if (isInProjectsGallery !== isHiddenRef.current) {
        isHiddenRef.current = isInProjectsGallery;
        gsap.to([cursor, cursorDot], {
          duration: 0.2,
          opacity: isInProjectsGallery ? 0 : 1,
          ease: "power2.out"
        });
      }

      if (!isInProjectsGallery) {
        // Only animate if not in projects gallery
        gsap.to(cursor, {
          duration: 0.5,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          ease: "power2.out"
        });

        gsap.to(cursorDot, {
          duration: 0.15,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          ease: "power2.out"
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isHiddenRef.current) return; // Don't handle hover effects if cursor is hidden

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
        gsap.to(cursorDot, {
          duration: 0.3,
          scale: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.to(cursor, {
          duration: 0.3,
          scale: 1,
          ease: "power2.out"
        });
        gsap.to(cursorDot, {
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
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="hidden md:block fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[99]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={cursorDotRef}
        className="hidden md:block fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[99]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
