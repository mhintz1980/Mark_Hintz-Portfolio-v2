import { motion, useScroll, useTransform } from "framer-motion";

// Configuration for each background drawing
const drawings = [
  // --- DRAWING 1: Visible immediately (Opted OUT of fade-in) ---
  {
    src: "/P000473.jpg",
    alt: "Mechanical Drawing 2",
    className:
      "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[40vw]",
    initialScale: 2.2,
    finalScale: 1.2,
    yOffset: -500,
    fadeInStart: 0.18,
    fadeInEnd: 0.24,
    fadeOutStart: 0.75,
    fadeOutEnd: 0.85,
    maxOpacity: 0.8,
  },

  // --- DRAWING 2: Sneaks in later (Opted IN to fade-in) ---
  {
    src: "/P001812.png",
    alt: "Mechanical Drawing 3",
    className: "bottom-[10%] left-[0%] w-[20vw] md:w-[35vw]",
    initialScale: 3,
    finalScale: 1,
    yOffset: -850,
    // We want this one to sneak in, so we define the fade-in points
    fadeOutStart: 0.2,
    fadeOutEnd: 0.3,
    maxOpacity: 0.4,
  },

  // --- DRAWING 3: Another sneaky one ---
  {
    src: "/P000629.jpg",
    alt: "Mechanical Drawing 4",
    className: "top-[0%] right-[15%] w-[40vw] md:w-[35vw]",
    initialScale: 2.5,
    finalScale: 1.5,
    yOffset: 650,
    fadeOutStart: 0.15,
    fadeOutEnd: 0.2,
    maxOpacity: 0.4,
  },
];

// A re-usable component for a single animating drawing layer
function DrawingLayer({
  drawing,
  scrollYProgress,
}: {
  drawing: any;
  scrollYProgress: any;
}) {
  // Destructure everything. Notice fadeInStart and fadeInEnd have NO defaults.
  // If you don't define them in the array, they simply become 'undefined'.
  const {
    src,
    alt,
    className,
    initialScale,
    finalScale,
    yOffset,
    fadeInStart,
    fadeInEnd,
    fadeOutStart = 0.7, // Still keeping defaults for the exit animation
    fadeOutEnd = 0.8,
    maxOpacity = 0.4,
  } = drawing;

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [initialScale, finalScale],
  );
  const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);

  // THE LOGIC: Does this drawing have BOTH fade-in properties defined?
  const hasFadeIn = fadeInStart !== undefined && fadeInEnd !== undefined;

  // Build the timeline arrays based on your opt-in logic
  const scrollPoints = hasFadeIn
    ? [0, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]
    : [0, fadeOutStart, fadeOutEnd];

  const opacityPoints = hasFadeIn
    ? [0, 0, maxOpacity, maxOpacity, 0]
    : [maxOpacity, maxOpacity, 0];

  // Feed the dynamically generated timeline to Framer Motion
  const opacity = useTransform(scrollYProgress, scrollPoints, opacityPoints);

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className={`absolute pointer-events-none ${className} flex items-center justify-center`}
    >
      <div
        className="w-full h-full"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`}
          alt={alt}
          className="w-full h-auto mix-blend-multiply grayscale opacity-85"
        />
      </div>
    </motion.div>
  );
}

export function CadBackground() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center bg-[#f8f9fa] overflow-hidden font-sans -z-10">
      {drawings.map((drawing, index) => (
        <DrawingLayer
          key={index}
          drawing={drawing}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
