'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Transform scrollYProgress to color
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1], // scroll progress from start to end
    ['rgb(59, 130, 246)', 'rgb(0, 0, 0)'] // color transition from blue to black
  );

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
      style={{ 
        scaleX: scrollYProgress,
        backgroundColor
      }}
    />
  );
}
