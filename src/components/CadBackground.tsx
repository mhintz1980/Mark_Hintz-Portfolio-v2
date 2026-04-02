import { motion, useScroll, useTransform } from "framer-motion";

// Configuration for each background drawing
const drawings = [
  // --- DRAWING 1: Visible immediately (Opted OUT of fade-in) ---
  {
    src: "/P001382.jpg",
    alt: "Big Housing",
    className: "bottom-[0%] left-[30%] w-[20vw] md:w-[35vw]",
    initialScale: 1,
    finalScale: 4,
    yOffset: 100,
    fadeInStart: 0.25,
    fadeInEnd: 0.6,
    maxOpacity: 0.6,
  },
  {
    src: "/P001812.png",
    alt: "Input Shaft",
    className: "bottom-[25%] left-[23%] w-[20vw] md:w-[35vw]",
    initialScale: 3,
    finalScale: 0.75,
    yOffset: -500,
    fadeOutStart: 0.25,
    fadeOutEnd: 0.7,
    maxOpacity: 0.2,
  },

  // --- DRAWING 2: Sneaks in later (Opted IN to fade-in) ---
  {
    src: "/P000473.jpg",
    alt: "Output Shaft",
    className: "top-[-0%] left-[0%] w-[20vw] md:w-[35vw]",
    initialScale: 1.5,
    finalScale: 4,
    yOffset: 500,
    // We want this one to sneak in, so we define the fade-in points
    fadeOutStart: 0.1,
    fadeOutEnd: 0.6,
    maxOpacity: 0.6,
  },

  // --- DRAWING 3: Another sneaky one ---
  {
    src: "/A000629.jpg",
    alt: "Gearbox Assembly",
    className: "bottom-[0%] right-[0%] w-[40vw] md:w-[35vw]",
    initialScale: 2.5,
    finalScale: 0.5,
    yOffset: 0,
    fadeOutStart: 0.15,
    fadeOutEnd: 0.5,
    maxOpacity: 0.25,
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
    fadeOutStart, // Still keeping defaults for the exit animation
    fadeOutEnd,
    maxOpacity,
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
    ? fadeOutStart > fadeInEnd
      ? [0, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]
      : [0, fadeInStart, fadeInEnd]
    : [0, fadeOutStart, fadeOutEnd];

  const opacityPoints = hasFadeIn
    ? fadeOutStart > fadeInEnd
      ? [0, 0, maxOpacity, maxOpacity, 0]
      : [0, 0, maxOpacity]
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
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)",
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
