import { Navbar } from './components/layout/Navbar';
import { CadBackground } from './components/CadBackground';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <>
      <CadBackground />
      <Navbar />
      <main className="relative z-10 w-full overflow-hidden selection:bg-accent-primary/20 selection:text-accent-primary">
        <Hero />
        <About />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}

export default App;
