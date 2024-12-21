'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MixBlendCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const isInProjectsGallery = target.closest('.projects-gallery') !== null;

      if (isInProjectsGallery !== isHiddenRef.current) {
        isHiddenRef.current = isInProjectsGallery;
        gsap.to(cursor, {
          duration: 0.2,
          opacity: isInProjectsGallery ? 0 : 1,
          ease: "power2.out"
        });
      }

      if (!isInProjectsGallery) {
        gsap.to(cursor, {
          duration: 0.3,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          ease: "power2.out",
          rotate: Math.atan2(
            mouseY - (cursor.getBoundingClientRect().top + cursor.offsetHeight / 2),
            mouseX - (cursor.getBoundingClientRect().left + cursor.offsetWidth / 2)
          ) * 180 / Math.PI
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
      } else {
        gsap.to(cursor, {
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
    <div 
      ref={cursorRef}
      className="hidden md:block fixed w-12 h-12 pointer-events-none z-[99] mix-blend-difference"
      style={{
        transform: 'translate(-50%, -50%)',
        background: 'white',
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
      }}
    />
  );
}
