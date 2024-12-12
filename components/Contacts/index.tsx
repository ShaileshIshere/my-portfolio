import { Poiret_One, Sulphur_Point, Bebas_Neue } from 'next/font/google';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Bebas_Neue_Font = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-bebas-neue'
})

const Poiret_One_Font = Poiret_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poiret-one'
});

const Sulphur_Point_Font = Sulphur_Point({
  weight: '300',
  subsets: ['latin'],
  variable: '--font-sulphur-point'
});

const Contacts = () => {

    const socials = [
        {
            name: "LinkedIn", 
            link: "https://www.linkedin.com/in/shailesh-kandari-a33112299/",
            icon: <Linkedin />
        },
        {
            name: "GitHub", 
            link: "https://github.com/ShaileshIshere",
            icon: <Github />
        },
        {
            name: "Twitter", 
            link: "https://x.com/_justShailesh",
            icon: <Twitter />
        },
        {
            name: "Instagram", 
            link: "https://www.instagram.com/_justt.shailesh/",
            icon: <Instagram />
        }
    ]

    return (
        <div id="contact" className="h-[100vh] flex flex-col items-center justify-between relative z-[1] p-8 -mt-[50vh] bg-[#000c1a]">
            <div className="absolute inset-0 animate-gradient bg-gradient-to-b from-[#004080] via-[#001731] to-transparent opacity-70"></div>
            <div className="w-full mx-auto relative z-10">
                <h1 className={`${Bebas_Neue_Font.className} text-[12vw] leading-[15rem] uppercase w-full font-bold text-white absolute top-0 left-4 md:left-16 lg:left-24 opacity-30`}>
                    Let&apos;s Work
                    <br />
                    <span className='text-outline'>Together</span>
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
                </h1>
            </div>

            {/* Contact Email */}
            <div className="w-full flex justify-end pr-[6rem]">
                <a href="mailto:shaileshkandari2004@gmail.com" 
                    className="group inline-flex items-center gap-2"
                >
                    <span className={`${Poiret_One_Font.className} text-4xl mt-[18rem] text-white hover:text-blue-400 transition-colors relative`}>
                        contactShailesh@gmail.com
                        <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-500 group-hover:w-full"></span>
                    </span>
                </a>
            </div>
            
            {/* Socials */}
            <div className="w-full flex items-center justify-between pb-8 px-16">
                {socials.map((social, index) => (
                    <div key={index} className="flex items-center group">    
                        <a href={social.link} 
                           target="_blank"
                           rel="noopener noreferrer"
                           className="group inline-flex items-center gap-4 transition-transform duration-300">
                            <div className="text-white hover:text-blue-400 transition-colors text-3xl">
                                {social.icon}
                            </div>
                            <span className={`${Sulphur_Point_Font.className} hidden md:inline text-3xl text-white hover:text-blue-400 transition-colors relative`}>
                                {social.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Contacts;
