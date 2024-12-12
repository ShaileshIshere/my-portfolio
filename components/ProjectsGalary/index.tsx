import { useRef, useState } from 'react';
import Modal from '@/components/ProjectsGalary/Modal';
import Project from '@/components/ProjectsGalary/Project';
import { Playwrite_DK_Loopet } from 'next/font/google'
import styles from './styles.module.css'
import { useScroll, useTransform, motion } from 'framer-motion';

const Playwrite_DK_Loopet_Font = Playwrite_DK_Loopet({
  weight: '100',
  variable: '--font-playwrite-dk-loopet'
});

interface Project {
  title: string;
  description: string;
  src: string;
  color: string;
}

const projects: Project[] = [
  {
    title: "Chat App",
    description: "Real Time & Full Stack",
    src: "demo-image-1.jpeg",
    color: "#21435E"
  },
  {
    title: "Manga Heaven",
    description: "Doujin & Mangas",
    src: "demo-image-2.jpeg",
    color: "#8C8C8C"
  },
  {
    title: "Medium",
    description: "Blogs & News",
    src: "demo-image-3.jpeg",
    color: "#EFE8D3"
  },
  {
    title: "Abyss",
    description: "Design & Development",
    src: "demo-image-4.jpeg",
    color: "#706D63"
  }
];

const ProjectsGalary = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  })
  const height = useTransform(scrollYProgress, [0, 0.97], [1200, 0])

  const [modal, setModal] = useState<{active: boolean, index: number}>({
    active: false, 
    index: 0
  });

  return (
    <>
      <section ref={container} id='work' className="flex h-[120vh] items-center justify-center">
        <div className="w-full flex flex-col items-center">
          <h2 className={`${Playwrite_DK_Loopet_Font.className} text-2xl text-white -mt-[18vh] self-start pl-[15vw] cursor-pointer`}>
            Some Of My Works
          </h2>
          <div className={`w-[70%] flex flex-col items-center justify-center mt-44 ${styles.noCursor}`}>
            {projects.map((project, index) => (
              <Project 
                key={index} 
                index={index} 
                title={project.title} 
                description={project.description}
                setModal={setModal}
              />
            ))}
          </div>
          <Modal modal={modal} projects={projects}/>
        </div>
      </section>
      
      {/* Curved div structure */}
      <div className="w-full bg-black" style={{ height: '500px', marginTop: '-50px' }}>
        <motion.div style={{height}} className="relative w-full">
          <div 
            className="absolute w-[120%] -left-[10%] origin-top z-10"
            style={{
              height: '100%',
              borderRadius: '0 0 50% 50%',
              backgroundColor: 'black',
              boxShadow: '0px 60px 50px rgba(0, 0, 0, 0.7)'
            }}
          />
        </motion.div>
      </div>
    </>
  );
}

export default ProjectsGalary;