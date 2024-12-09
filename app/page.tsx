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
      <Contacts />
    </main>
  );
}

export default Page;