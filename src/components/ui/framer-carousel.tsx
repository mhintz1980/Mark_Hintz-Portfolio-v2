import { useRef, useState } from 'react';
import { motion } from 'motion/react';


const items = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=880&auto=format&fit=crop',
    title: 'Misty Mountain Majesty',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1539552678512-4005a33c64db?q=80&w=880&auto=format&fit=crop',
    title: 'Winter Wonderland',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1709983966747-58c311fa6976?q=80&w=880&auto=format&fit=crop',
    title: 'Autumn Mountain Retreat',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1683722319473-f851deb3fdf2?q=80&w=880&auto=format&fit=crop',
    title: 'Tranquil Lake Reflection',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1560790671-b76ca4de55ef?q=80&w=734&auto=format&fit=crop',
    title: 'Misty Mountain Peaks',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1698774303292-7af9410c3a57?q=80&w=436&auto=format&fit=cropv',
    title: 'Golden Hour Glow',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1643994542584-1247b5266429?q=80&w=869&auto=format&fit=crop',
    title: 'Snowy Mountain Highway',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1613681230409-6423a38c43e1?q=80&w=871&auto=format&fit=crop',
    title: 'Foggy Mountain Forest',
  },
];

export function FramerCarousel() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== index) {
      setIndex(newIndex);
    }
  };

  const scrollTo = (newIndex: number) => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    containerRef.current.scrollTo({ left: width * newIndex, behavior: 'smooth' });
    setIndex(newIndex);
  };

  return (
    <div className='p-2 w-full'>
      <div className='flex flex-col gap-3'>
        <div className='relative overflow-hidden rounded-2xl border border-white/10 group'>
          <div 
            className='flex overflow-x-auto snap-x snap-mandatory hide-scrollbar' 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            ref={containerRef}
            onScroll={handleScroll}
          >
            {items.map((item) => (
              <div key={item.id} className='shrink-0 w-full h-[500px] snap-center'>
                <img
                  src={item.url}
                  alt={item.title}
                  className='w-full h-full object-cover rounded-xl select-none'
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.button
            disabled={index === 0}
            onClick={() => scrollTo(Math.max(0, index - 1))}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${
                index === 0
                  ? 'opacity-40 cursor-not-allowed bg-black/50 text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:scale-110 border border-white/20'
              }`}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </motion.button>

          {/* Next Button */}
          <motion.button
            disabled={index === items.length - 1}
            onClick={() => scrollTo(Math.min(items.length - 1, index + 1))}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${
                index === items.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-black/50 text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:scale-110 border border-white/20'
              }`}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </motion.button>
          
          {/* Progress Indicator */}
          <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10'>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
