'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    const blob = blobRef.current;
    const dot = dotRef.current;

    if (!blob || !dot) return;

    const moveCursor = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const isInProjectsGallery = target.closest('.projects-gallery') !== null;

      if (isInProjectsGallery !== isHiddenRef.current) {
        isHiddenRef.current = isInProjectsGallery;
        gsap.to([blob, dot], {
          duration: 0.2,
          opacity: isInProjectsGallery ? 0 : 1,
          ease: "power2.out"
        });
      }

      if (!isInProjectsGallery) {
        gsap.to(blob, {
          duration: 0.8,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          ease: "power2.out"
        });

        gsap.to(dot, {
          duration: 0.1,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          ease: "power2.out"
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
        gsap.to(blob, {
          duration: 0.3,
          scale: 1.5,
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0) 70%)',
          ease: "power2.out"
        });
      } else {
        gsap.to(blob, {
          duration: 0.3,
          scale: 1,
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
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
        ref={blobRef}
        className="hidden md:block fixed w-32 h-32 pointer-events-none z-[98]"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
        }}
      />
      <div 
        ref={dotRef}
        className="hidden md:block fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[99]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
