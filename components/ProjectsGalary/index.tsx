import { useRef, useState } from 'react';
import Modal from '@/components/ProjectsGalary/Modal';
import Project from '@/components/ProjectsGalary/Project';
import Image from 'next/image';
import { Playwrite_DK_Loopet, Poiret_One, Sulphur_Point } from 'next/font/google'
import styles from './styles.module.css'
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import ProjectCarousel from './ProjectCarousal';
import './styles/carousel.css';

const Playwrite_DK_Loopet_Font = Playwrite_DK_Loopet({
  weight: '100',
  variable: '--font-playwrite-dk-loopet'
});
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

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  src: string;
  images: string[];
  color: string;
  technologies: {
    frontend: string;
    backend: string;
    devops: string;
  };
  links: {
    live: string;
    github: string;
  };
}

const projects: Project[] = [
  {
    id: "MessageHub",
    title: "MessageHub",
    description: "Real Time & Full Stack",
    longDescription: "A real-time chat application with user authentication, private messaging, group chats and file sharing capabilities built using modern web technologies.",
    src: "chat-app-image-1.png",
    images: ["chat-app-image-2.png", "chat-app-image-3.png", "chat-app-image-4.png"],
    color: "#21435E",
    technologies: {
      frontend: "React, TypeScript, TailwindCSS, Socket.io-client",
      backend: "Node.js, Express, Socket.io, MongoDB",
      devops: "Docker, AWS, Github Actions"
    },
    links: {
      live: "https://chat-app-lemon-omega.vercel.app/",
      github: "https://github.com/ShaileshIshere/chat-app"
    }
  },
  {
    id: "manga-heaven",
    title: "Manga Heaven",
    description: "Doujin & Mangas",
    longDescription: "A digital manga reading platform featuring a vast collection of manga titles, personalized reading lists, and seamless reading experience across devices.",
    src: "manga-haven-image-1.png",
    images: ["manga-haven-image-1.png", "manga-haven-image-2.png", "manga-haven-image-3.png"],
    color: "#8C8C8C",
    technologies: {
      frontend: "Next.js, React, TailwindCSS, Recoil",
      backend: "Next.js API, Prisma, PostgreSQL",
      devops: "Vercel, Github Actions"
    },
    links: {
      live: "https://manga-haven-beta.vercel.app/",
      github: "https://github.com/ShaileshIshere/MangaHaven"
    }
  },
  {
    id: "Note Craft",
    title: "Note Craft",
    description: "Blogs & News",
    longDescription: "A Medium-inspired blogging platform where users can publish articles, follow writers, and engage with content through comments and reactions.",
    src: "medium-blog-image-1.png",
    images: ["medium-blog-image-1.png", "medium-blog-image-2.png", "medium-blog-image-3.png"],
    color: "#EFE8D3",
    technologies: {
      frontend: "Next.js, React, TailwindCSS, Recoil",
      backend: "Next.js API, Prisma, PostgreSQL",
      devops: "Vercel, Github Actions"
    },
    links: {
      live: "https://medium-blogs-client.vercel.app/",
      github: "https://github.com/ShaileshIshere/medium-blogs"
    }
  },
  {
    id: "abyss",
    title: "Abyss",
    description: "Design & Development",
    longDescription: "A portfolio showcase platform for designers and developers to display their work with interactive previews and detailed project information.",
    src: "abyss-image-1.png",
    images: ["abyss-image-1.png", "abyss-image-2.png", "abyss-image-3.png"],
    color: "#706D63",
    technologies: {
      frontend: "Next.js, React, TailwindCSS, Recoil",
      backend: "Next.js API, Prisma, PostgreSQL",
      devops: "Vercel, Github Actions"
    },
    links: {
      live: "https://project-anime-recomendations.vercel.app/",
      github: "https://github.com/ShaileshIshere/project-anime-recomendations"
    }
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

  // Add state for project details view
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const showProjectDetails = (project: Project) => {
    setSelectedProject(project);
    
    // Improved animation sequence
    gsap.timeline()
      .set(".project-details", {
        display: "block",
        y: "100%"
      })
      .to(".project-details", {
        y: "0%",
        duration: 0.6,
        ease: "power3.inOut",
        onStart: () => setIsDetailsVisible(true)
      })
      .from(".project-details .content > *", {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      });
  };

  const hideProjectDetails = () => {
    gsap.timeline()
      .to(".project-details .content > *", {
        y: 30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      })
      .to(".project-details", {
        y: "100%",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          setIsDetailsVisible(false);
          setSelectedProject(null);
          gsap.set(".project-details", { display: "none" });
        }
      });
  };

  return (
    <>
      <section ref={container} id='work' className="flex h-[120vh] items-center justify-center">
        <div className="w-full flex flex-col items-center">
          <h2 className={`${Playwrite_DK_Loopet_Font.className} text-2xl text-white mt-[3vh] md:-mt-[2%] self-start pl-[15vw] cursor-pointer`}>
            Some Of My Works
          </h2>

          {/* Desktop View (hidden on mobile/tablet) */}
          <div className={`${styles.noCursor} projects-gallery hidden lg:flex w-[70%] flex-col items-center justify-center mt-44`}>
            {projects.map((project, index) => (
              <div 
                key={index}
                onClick={() => showProjectDetails(project)}
                className="w-full cursor-pointer"
              >
                <Project 
                  id={project.id}
                  index={index} 
                  title={project.title} 
                  description={project.description}
                  setModal={setModal}
                  onClick={() => showProjectDetails(project)}
                />
              </div>
            ))}
            <Modal modal={modal} projects={projects}/>
          </div>

          {/* Mobile/Tablet View (hidden on desktop) */}
          <div className="lg:hidden w-full px-4 mt-8 pb-16">
            {/* Enhanced Mobile/Tablet View */}
            <motion.div 
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3
                  }
                }
              }}
            >
              {projects.slice(0, 2).map((project, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }
                  }}
                  className="group"
                >
                  {/* <Link 
                    href={`/typescript/projects/${project.id}`}
                    className="block"
                  > */}
                    {/* Project Card */}
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-1 group-hover:scale-[1.02] transition-all duration-500 ease-out">
                      <div className="relative bg-black rounded-lg overflow-hidden">
                        
                        {/* Project Image */}
                        <div className="relative w-full aspect-[16/9] overflow-hidden">
                          <Image
                            src={`/project-galary/${project.src}`}
                            fill
                            alt={project.title}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                          
                          {/* Tech badges overlay */}
                          {/* <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            {project.technologies.frontend.split(',').slice(0, 2).map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-white/90 border border-white/20"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div> */}

                          {/* External link indicator */}
                          {/* <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                            <svg 
                              className="w-4 h-4 text-white/80 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path 
                                d="M7 17l9.2-9.2M17 17V8h-9" 
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div> */}
                        </div>

                        {/* Project Info */}
                        <div className="p-4">
                          {/* Title and description */}
                          <div className="mb-3">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className={`${Poiret_One_Font.className} text-2xl md:text-3xl text-white font-medium group-hover:text-blue-400 transition-colors duration-300`}>
                                {project.title}
                              </h3>
                              <span className="text-xs text-white/40 uppercase tracking-wider mt-2">
                                0{index + 1}
                              </span>
                            </div>
                            
                            <p className={`${Sulphur_Point_Font.className} text-sm md:text-base text-white/60 mb-3 leading-relaxed`}>
                              {project.description}
                            </p>
                            
                            <p className={`${Sulphur_Point_Font.className} text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2 hidden sm:block`}>
                              {project.longDescription}
                            </p>
                          </div>

                          {/* Technology stack preview */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {[...project.technologies.frontend.split(','), ...project.technologies.backend.split(',')]
                              .slice(0, 3)
                              .map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-2 py-1 text-xs bg-gray-800/50 rounded text-white/70 border border-gray-700/50"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                            {[...project.technologies.frontend.split(','), ...project.technologies.backend.split(',')].length > 4 && (
                              <span className="px-2 py-1 text-xs text-white/50">
                                +{[...project.technologies.frontend.split(','), ...project.technologies.backend.split(',')].length - 4} more
                              </span>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2">
                            <Link 
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-3 group-hover:from-blue-500 group-hover:to-blue-400 transition-all duration-300"
                            >
                              <div className="flex items-center justify-center gap-2 text-white font-medium">
                                <span className="text-sm">View Project</span>
                                <svg 
                                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path 
                                    d="M5 12h14m-7-7l7 7-7 7" 
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </Link>
                            
                            <Link 
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-300"
                            >
                              <svg 
                                className="w-5 h-5 text-white/70"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  {/* </Link> */}
                </motion.div>
              ))}

              {/* View All Projects Button */}
              {/* <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.6
                    }
                  }
                }}
                className="text-center pt-6"
              >
                <Link 
                  href="/projects"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full text-white font-medium hover:from-gray-700 hover:to-gray-600 transition-all duration-300 group border border-gray-600/50"
                >
                  <span>View All Projects</span>
                  <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <svg 
                      className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path 
                        d="M5 12h14m-7-7l7 7-7 7" 
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              </motion.div> */}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Project Details Panel */}
      <div 
        className={`project-details fixed inset-0 bg-black z-50 ${!isDetailsVisible ? 'hidden' : ''}`}
      >
        {selectedProject && (
          <div className="content min-h-screen bg-black">
            <div className="container mx-auto max-w-7xl px-8">
              {/* Close button only */}
              <div className="py-4">
                <button 
                  onClick={hideProjectDetails}
                  className="text-3xl text-white/70 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Project Info Section */}
              <div className="mb-8">
                {/* Title row with links */}
                <div className="flex items-center justify-between mb-6">
                  <div className="group flex items-center gap-4">
                    <h1 className={`${Poiret_One_Font.className} text-7xl text-white`}>
                      {selectedProject.title}
                    </h1>
                    <a 
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white/70 group-hover:text-white transition-colors"
                    >
                      <svg 
                        className="w-20 h-20 transform group-hover:translate-x-2 transition-transform duration-300"
                        viewBox="-4 -1 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path 
                          d="M7 17l9.2-9.2M17 17V8h-9" 
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a 
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center text-lg gap-2 text-white hover:text-white/70 transition-colors"
                    >
                      GitHub
                      <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path 
                          d="M7 17l9.2-9.2M17 17V8h-9" 
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Description and Technologies grid */}
                <div className="grid grid-cols-12 gap-16">
                  {/* Description */}
                  <div className="col-span-4">
                    <h2 className="text-white/50 uppercase text-sm tracking-wider mb-4">DESCRIPTION</h2>
                    <p className="text-white/80 text-lg">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="col-span-8 grid grid-cols-2 gap-16">
                    {/* Frontend */}
                    <div>
                      <h2 className="text-white/50 uppercase text-sm tracking-wider mb-4">Frontend</h2>
                      <ul className="list-disc list-inside space-y-2">
                        {selectedProject.technologies.frontend.split(',').map((tech, index) => (
                          <li key={index} className="text-white/80 text-lg">
                            {tech.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Backend */}
                    <div>
                      <h2 className="text-white/50 uppercase text-sm tracking-wider mb-4">Backend</h2>
                      <ul className="list-disc list-inside space-y-2">
                        {selectedProject.technologies.backend.split(',').map((tech, index) => (
                          <li key={index} className="text-white/80 text-lg">
                            {tech.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-width Project Image */}
              {/* <div className="w-full max-w-4xl mx-auto aspect-[16/8] rounded-lg overflow-hidden mb-16">
                <Image
                  src={`/project-galary/${selectedProject.src}`}
                  width={1920}
                  height={1080}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  priority
                />
              </div> */}
              <ProjectCarousel images={selectedProject.images} title={selectedProject.title} />
            </div>
          </div>
        )}
      </div>
      
      {/* Curved div structure (visible only on desktop) */}
      <div className="w-full bg-black" style={{ height: 'calc(120vh - 500px)', marginTop: '-50px' }}>
        <motion.div style={{height}} className="relative w-full">
          <div 
            className="absolute w-[150%] md:w-[130%] lg:w-[120%] -left-[30%] md:-left-[20%] lg:-left-[10%] origin-top z-10"
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