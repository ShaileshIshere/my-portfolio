'use client';
import React from 'react';
import { Poiret_One, Sulphur_Point } from 'next/font/google'

const Poiret_One_Font = Poiret_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poiret-one'
})
const Sulphur_Point_Font = Sulphur_Point({
  weight: '300',
  subsets: ['latin'],
  variable: '--font-sulphur-point'
})

// Define props type
interface ProjectProps {
  id: string;
  index: number;
  title: string;
  description: string;
  setModal: React.Dispatch<React.SetStateAction<{active: boolean, index: number}>>;
  onClick: () => void;
}

export default function Project({ index, title, description, setModal, onClick }: ProjectProps) {
  return (
    <div 
      onClick={onClick}
      className="w-full flex justify-between items-center px-[100px] py-[50px] border-t border-gray-300 cursor-pointer transition-all duration-200 hover:opacity-50 group"
      onMouseEnter={() => setModal({active: true, index})}
      onMouseLeave={() => setModal({active: false, index})}
    >
      <h2 className={`${Poiret_One_Font.className} text-6xl text-white m-0 font-normal transition-all duration-400 group-hover:translate-x-[-10px]`}>
        {title}
      </h2>
      <p className={`${Sulphur_Point_Font.className} text-xl transition-all duration-400 text-white group-hover:translate-x-[10px]`}>
        {description}
      </p>
    </div>
  );
}