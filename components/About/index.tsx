"use client"

import { motion } from 'framer-motion';
import MagnetButton from '@/components/MagnetButton';
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

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 100 
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut"
    }
  }),
  hover: {
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const About = () => {
  return (
    <section id="about" className="relative z-[1]">
      <div className="
        h-[200vh] relative
        bg-gradient-to-b from-[#001731] from-0% via-[#001731] via-25% to-black to-65%
        max-md:h-[100vh]
      ">
        <div className='relative w-[70%] left-[15%] flex flex-col items-center'>
          <section className='w-full h-fit-content relative flex justify-center'>
            <p className={`${Poiret_One_Font.className} text-[3vw] text-white leading-[1] -mt-[10vh]`}>
              I believe in coding with purpose and precision. Every project is an opportunity to push boundaries, solve problems, and create experiences that matter. With a passion for collaboration and continuous learning, I aim to stay ahead of the curve, delivering work that&apos;s not just cutting-edge but also meaningful to its users.
            </p>
          </section>

          <div className="w-full relative mt-20 border-b-[1px] border-gray-600 mb-[7vh]">
            <p className="italic text-gray-400 ml-1">About me.</p>
          </div>

          <section className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full relative max-w-5xl gap-10">
            <div 
              className="text-center lg:text-left w-fit mt-12"
              onClick={() => {
                window.open("https://github.com/ShaileshIshere", "_blank");
              }}
            >
              <MagnetButton 
                width="17rem"
                height="17rem"
                className="bg-[#1f2937]"
              >
                <span className="text-2xl font-medium text-gray-200">Get In Touch</span>
              </MagnetButton>
            </div>

            <motion.div className={`w-full lg:w-[60%] text-center text-white text-[1.5vw] lg:text-left leading-[4vh] ${Sulphur_Point_Font.className}`}>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hello World! I&apos;m Shailesh Kandari, a dedicated full-stack developer passionate about creating innovative and scalable solutions. I thrive in collaborative environments where ideas flourish, and teamwork brings concepts to life. With expertise in React, Node.js, Next.js.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                I focus on crafting user-centric applications that deliver meaningful experiences. Outside of coding, I&apos;m constantly expanding my knowledge and staying on the cutting edge of emerging technologies to build for the future.
              </motion.p>
            </motion.div>
          </section>

          <div className="w-full relative mt-52 mb-40">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`text-[64px] text-white mb-32 font-light ${Poiret_One_Font.className}`}
            >
              I can help you with
              <motion.div className="inline-flex">
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    animate={{
                      opacity: [
                        0,
                        ...(Array(index).fill(0)),
                        ...Array(3 - index).fill(1),
                        0
                      ],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.2, 0.4, 0.8, 1],
                      repeat: Infinity,
                      repeatDelay: 0.3
                    }}
                    className="inline-block"
                  >
                    .
                  </motion.span>
                ))}
              </motion.div>
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-24 cursor-pointer"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {[
                { number: "01", title: "Design", content: "With a solid track record in designing websites, I deliver strong and user-friendly digital designs. (Since 2024 only in combination with development)" },
                { number: "02", title: "Development", content: "I build scalable websites from scratch that fit seamlessly with design. My focus is on micro animations, transitions and interaction. Building with React, Next.js, and modern web technologies." },
                { number: "03", title: "The full package", content: "A complete website from concept to implementation, that's what makes me stand out. My great sense for design and my development skills enable me to create kick-ass projects." }
              ].map((item, index) => (
                <motion.div 
                  key={item.number}
                  className="flex flex-col"
                  variants={itemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <span className="text-[#696969] mb-6 text-xl">{item.number}</span>
                  <h3 className="text-[40px] text-white mb-8 font-light">
                    {item.title === "The full package" && (
                      <motion.span 
                        className="inline-block mr-3"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        ✦
                      </motion.span>
                    )}
                    {item.title}
                  </h3>
                  <p className="text-[#696969] text-xl leading-relaxed">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;