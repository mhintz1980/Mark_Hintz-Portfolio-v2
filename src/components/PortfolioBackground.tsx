import { motion, useScroll, useTransform } from 'framer-motion';

export const PortfolioBackground = () => {
  // Hook into the scroll position
  const { scrollYProgress } = useScroll();

  // Animations based on scroll progress (0 is top of page, 1 is bottom)
  // Scale the drawing from 1 to 1.5 (moves "towards" the user)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  // Fade the drawing from 30% opacity down to 0%
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0]);
  // Slowly drift the drawing downwards as you scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center bg-[#f8f9fa] overflow-hidden font-sans">
      <motion.div
        style={{ scale, opacity, y }}
        className="relative w-full max-w-4xl flex items-center justify-center"
      >
        <div 
          className="w-full h-full"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)'
          }}
        >
          <img 
              src={`${import.meta.env.BASE_URL}P000420.png`} 
              alt="CAD Background" 
              className="w-full h-auto mix-blend-multiply opacity-50 grayscale"
          />

          <svg viewBox="0 0 800 600" className="w-full h-auto stroke-[#64748b] fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="400" y1="100" x2="400" y2="500" strokeDasharray="40,10,10,10" strokeWidth="1" />
            <line x1="200" y1="300" x2="600" y2="300" strokeDasharray="40,10,10,10" strokeWidth="1" />
            
            <circle cx="400" cy="300" r="150" />
            <circle cx="400" cy="300" r="120" />
            <circle cx="400" cy="300" r="80" strokeDasharray="10,5" strokeWidth="1" />
            
            {Array.from({ length: 24 }).map((_, i) => (
              <path 
                key={i} 
                d={`M ${400 + 120 * Math.cos(i * 15 * Math.PI / 180)} ${300 + 120 * Math.sin(i * 15 * Math.PI / 180)} L ${400 + 130 * Math.cos(i * 15 * Math.PI / 180)} ${300 + 130 * Math.sin(i * 15 * Math.PI / 180)}`} 
                strokeWidth="1.5"
              />
            ))}

            <line x1="200" y1="100" x2="200" y2="130" strokeWidth="1" />
            <line x1="600" y1="100" x2="600" y2="130" strokeWidth="1" />
            <line x1="200" y1="115" x2="600" y2="115" strokeWidth="1" />
            <polygon points="200,115 215,110 215,120" className="fill-[#64748b]" />
            <polygon points="600,115 585,110 585,120" className="fill-[#64748b]" />
            
            <text x="400" y="105" textAnchor="middle" className="fill-[#64748b] stroke-none font-mono text-xl tracking-widest">Ø 2.500 ±.002</text>
            
            <rect x="230" y="420" width="30" height="30" strokeWidth="1.5" />
            <text x="245" y="442" textAnchor="middle" className="fill-[#64748b] stroke-none font-mono text-xl">A</text>
            <line x1="245" y1="420" x2="245" y2="380" strokeWidth="1" />
            <polygon points="245,380 240,395 250,395" className="fill-[#64748b]" />

            <rect x="350" y="470" width="160" height="30" strokeWidth="1" />
            <line x1="390" y1="470" x2="390" y2="500" strokeWidth="1" />
            <line x1="470" y1="470" x2="470" y2="500" strokeWidth="1" />
            <circle cx="370" cy="485" r="8" strokeWidth="1" />
            <line x1="362" y1="485" x2="378" y2="485" strokeWidth="1" />
            <line x1="370" y1="477" x2="370" y2="493" strokeWidth="1" />
            <text x="430" y="492" textAnchor="middle" className="fill-[#64748b] stroke-none font-mono text-lg">Ø .002</text>
            <text x="490" y="492" textAnchor="middle" className="fill-[#64748b] stroke-none font-mono text-lg">A</text>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
