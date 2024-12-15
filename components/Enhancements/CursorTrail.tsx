'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useEffect(() => {
    setTrail(prev => [...prev, mousePosition].slice(-5));
  }, [mousePosition]);

  return (
    <>
      {trail.map((position, index) => (
        <motion.div
          key={index}
          className="fixed w-2 h-2 rounded-full bg-blue-400/30 pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
            scale: 1 - index * 0.2,
          }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </>
  );
}
