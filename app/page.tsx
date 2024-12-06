import Home from '@/components/Home';
import About from '@/components/About';

const Page = () => {
  return (
    <main className="relative">
      <Home />
      <About />
      <section id="work" className="min-h-screen flex items-center justify-center relative z-[1]">
        {/* Work section content will go here */}
      </section>
      <section id="contact" className="min-h-screen flex items-center justify-center relative z-[1]">
        {/* Contact section content will go here */}
      </section>
    </main>
  );
}

export default Page;