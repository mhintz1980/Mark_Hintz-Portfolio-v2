import { ExpandOnHover } from '../components/ui/expand-cards';
import { GlowCard } from '../components/ui/spotlight-card';
import { TextGlitch } from '../components/ui/text-glitch';
import { BlurTextAnimation } from '../components/ui/blur-text';
import { TubesCursor } from '../components/ui/tubes-cursor';
import StackingCard from '../components/ui/stacking-card';
import StickyScroll from '../components/ui/sticky-scroll';
import { FramerCarousel } from '../components/ui/framer-carousel';
import PricingSection4 from '../components/ui/pricing-section-4';
import InfiniteGallery  from '../components/ui/3d-gallery-photography';

const sampleImages = [
  { src: 'https://images.unsplash.com/photo-1741332966416-414d8a5b8887?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8', alt: 'Image 1' },
  { src: 'https://images.unsplash.com/photo-1754769440490-2eb64d715775?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 2' },
  { src: 'https://images.unsplash.com/photo-1758640920659-0bb864175983?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 3' },
  { src: 'https://images.unsplash.com/photo-1746023841657-e5cd7cc90d2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 5' },
];

const stackingProjects = [
  {
    title: 'Matthias Leidinger',
    description: 'Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.',
    link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
    color: '#5196fd',
  },
  {
    title: 'Clément Chapillon',
    description: 'This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes.',
    link: 'https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=500&auto=format&fit=crop&q=60',
    color: '#8f89ff',
  },
  {
    title: 'Zissou',
    description: 'Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal.',
    link: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=500&auto=format&fit=crop',
    color: '#13006c',
  },
  {
    title: 'Mathias Svold',
    description: 'The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers.',
    link: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=500&auto=format&fit=crop&q=60',
    color: '#ed649e',
  },
];


export function FeaturesPlaygroundPage() {
  return (
    <div className="min-h-screen bg-black text-white w-full">
      <div className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white">UI Features Playground</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-body">
          Testing area for high-end components. Scroll down to see the integrations.
        </p>
        <div className="mt-8">
          <a href="/#projects" className="inline-block border border-white/20 text-white font-heading font-bold px-6 py-3 uppercase tracking-wider text-sm transition-colors hover:border-white/40">
            Return to Home
          </a>
        </div>
      </div>
      
      {/* Feature Demos Will Be Mounted Below */}
      <div className="flex flex-col w-full gap-32 py-32 items-center text-center text-white">
        
        {/* GROUP A: Cards & Hover Effects */}
        <section className="w-full flex flex-col items-center">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Group A: Cards & Hover Effects</h2>
            <p className="text-gray-400">Expandable card gallery and generic cards with cursor-chasing spotlights.</p>
          </div>
          
          <div className="w-full max-w-7xl px-4">
            <h3 className="text-2xl font-bold mb-8 text-left text-secondary border-b border-white/10 pb-2">ExpandOnHover</h3>
            <ExpandOnHover />
          </div>

          <div className="w-full max-w-7xl px-4 mt-24">
            <h3 className="text-2xl font-bold mb-8 text-left text-secondary border-b border-white/10 pb-2">GlowCard / Spotlight</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center bg-[#0a0a0a] p-12 rounded-3xl border border-white/5">
              <GlowCard size="md" glowColor="blue">
                <div className="h-full flex flex-col justify-end text-left relative z-20">
                  <h4 className="text-xl font-bold mb-2">Industrial Blueprint</h4>
                  <p className="text-sm text-gray-400">Pneumatic system layouts.</p>
                </div>
              </GlowCard>
              <GlowCard size="md" glowColor="orange">
                 <div className="h-full flex flex-col justify-end text-left relative z-20">
                  <h4 className="text-xl font-bold mb-2">Thermal Testing</h4>
                  <p className="text-sm text-gray-400">Heat dissipation specs.</p>
                </div>
              </GlowCard>
              <GlowCard size="md" glowColor="purple">
                 <div className="h-full flex flex-col justify-end text-left relative z-20">
                  <h4 className="text-xl font-bold mb-2">Kinetic Analysis</h4>
                  <p className="text-sm text-gray-400">Vibration tolerance maps.</p>
                </div>
              </GlowCard>
            </div>
          </div>
        </section>

        {/* GROUP B: Text & Interactions */}
        <section className="w-full flex flex-col items-center mt-32">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Group B: Text & Interactions</h2>
            <p className="text-gray-400">Glitch effects, cinematic blur, and dynamic WebGL cursors.</p>
          </div>
          
          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl mb-12">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Text Glitch Effect</h3>
            <TextGlitch text="MECHANICAL" hoverText="PRECISION." />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl mb-12">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Cinematic Blur Texts</h3>
            <BlurTextAnimation 
              text="Optimized load characteristics and dynamic kinetic stress thresholds exceed standard operational limits."
              fontSize="text-3xl md:text-5xl"
            />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Interactive WebGL Cursor Wrapper</h3>
            <p className="mb-4 text-gray-500 text-sm">Click anywhere within the box below to randomize particle colors.</p>
            <TubesCursor />
          </div>
        </section>

        {/* GROUP C: Scroll Dynamics */}
        <section className="w-full flex flex-col items-center mt-32">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Group C: Scroll Dynamics</h2>
            <p className="text-gray-400">Complex scroll behaviors bounded within constrained viewports.</p>
          </div>
          
          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl mb-12 bg-black">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Parallax Scroll Cards</h3>
            <p className="mb-6 text-gray-500 text-sm">Scroll within the box below to see stacking cards.</p>
            <StackingCard projects={stackingProjects} />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl mb-12 bg-black">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Sticky Scroll Gallery</h3>
             <p className="mb-6 text-gray-500 text-sm">Scroll within the box below to reveal the sticky image gallery.</p>
            <StickyScroll />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl bg-black">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2">Framer Carousel</h3>
            <p className="mb-6 text-gray-500 text-sm">Horizontal motion carousel with progress indicators.</p>
            <FramerCarousel />
          </div>
        </section>

        {/* GROUP D: Layouts & 3D */}
        <section className="w-full flex flex-col items-center mt-32">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Group D: Layouts & 3D</h2>
            <p className="text-gray-400">Complex orchestrated layouts and high-end WebGL elements.</p>
          </div>
          
          <div className="w-full max-w-7xl px-4 text-left mb-12 relative overflow-hidden">
             <PricingSection4 />
          </div>

          <div className="w-full max-w-7xl px-4 text-left border border-white/10 p-12 rounded-3xl bg-black relative">
            <h3 className="text-2xl font-bold mb-8 text-secondary border-b border-white/10 pb-2 z-20 relative">3D Photography Gallery</h3>
            <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-neutral-900">
               <InfiniteGallery
                 images={sampleImages}
                 speed={1.0}
                 zSpacing={3}
                 visibleCount={8}
                 falloff={{ near: 0.8, far: 14 }}
                 className="h-[600px] w-full"
               />
               <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-exclusion text-white">
                 <h2 className="text-5xl md:text-7xl font-bold opacity-30 italic">Perspective</h2>
               </div>
               <div className="absolute bottom-6 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-widest text-white/50">
                 Scroll to fly through space
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
