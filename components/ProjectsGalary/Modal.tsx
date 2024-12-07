'use client';
import { useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';

// Type definitions
interface Project {
  title: string;
  src: string;
  color: string;
}

interface ModalProps {
  modal: { active: boolean; index: number };
  projects: Project[];
}

// Animation variants
const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { 
    scale: 1, 
    x: "-50%", 
    y: "-50%", 
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
  },
  closed: { 
    scale: 0, 
    x: "-50%", 
    y: "-50%", 
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } 
  }
};

export default function Modal({ modal, projects }: ModalProps) {
  const { active, index } = modal;
  
  // Refs with explicit typing
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Null checks for refs
    if (!modalContainer.current || !cursor.current || !cursorLabel.current) return;

    // Move Container
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });

    // Move cursor
    const xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });

    // Move cursor label
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });

    // Mouse move event handler
    const handleMouseMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <motion.div 
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="h-[350px] w-[400px] absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center"
      >
        <div 
          style={{top: `${index * -100}%`}} 
          className="h-full w-full absolute transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          {projects.map((project, index) => {
            const { src, color } = project;
            return (
              <div 
                key={`modal_${index}`} 
                className="h-full w-full flex items-center justify-center"
                style={{backgroundColor: color}}
              >
                <Image 
                  src={`/project-galary/${src}`}
                  width={300}
                  height={0}
                  alt="image"
                  className="h-auto"
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div 
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="w-20 h-20 rounded-full bg-[#455CE9] text-white absolute z-20 flex items-center justify-center text-sm font-light pointer-events-none"
      />

      <motion.div 
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="w-20 h-20 rounded-full bg-transparent absolute z-20 flex items-center justify-center text-white text-sm pointer-events-none"
      >
        View
      </motion.div>
    </>
  );
}