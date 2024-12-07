'use client'

import Home from '@/components/Home';
import About from '@/components/About';
import ProjectsGalary from '@/components/ProjectsGalary';
import Contacts from '@/components/Contacts';

const Page = () => {
  return (
    <main className="relative">
      <Home />
      <About />
      <ProjectsGalary />
      <section id="contact" className="min-h-screen flex items-center justify-center relative z-[1] bg-indigo-900">
        {/* Contact section content will go here */}
        <Contacts />
      </section>
    </main>
  );
}

export default Page;