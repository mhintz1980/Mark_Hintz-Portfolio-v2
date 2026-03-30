import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import {
  GearDrawing,
  BracketDrawing,
  ShaftDrawing,
  HousingDrawing,
  ToleranceZoneDrawing,
  DimensionDetailDrawing,
} from './CadDrawings';

export const CadBackground = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Smooth out scroll value
  const smoothY = useSpring(scrollY, { damping: 20, stiffness: 100, mass: 0.5 });

  // Layer 1 - Deepest (moves slowest)
  const layer1Y = useTransform(smoothY, [0, 3000], [0, -150]);
  const layer1Rotate = useTransform(smoothY, [0, 3000], [-5, 5]);

  // Layer 2
  const layer2Y = useTransform(smoothY, [0, 3000], [0, -300]);
  const layer2Rotate = useTransform(smoothY, [0, 3000], [2, -3]);

  // Layer 3
  const layer3Y = useTransform(smoothY, [0, 3000], [0, -500]);

  // Layer 4 - Closest (moves fastest)
  const layer4Y = useTransform(smoothY, [0, 3000], [0, -700]);
  const layer4Rotate = useTransform(smoothY, [0, 3000], [0, 4]);

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute left-[15%] top-[10%] w-[25vw] opacity-50"><GearDrawing /></div>
        <div className="absolute right-[10%] top-[40%] w-[30vw] opacity-40"><HousingDrawing /></div>
        <div className="absolute left-[50%] top-[60%] w-[15vw] opacity-50"><BracketDrawing /></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-background [perspective:1500px]">
      {/* Engineering grid pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />

      {/* ========== LAYER 1 — Deepest: large, slow-moving ========== */}
      <motion.div
        style={{ y: layer1Y, rotateZ: layer1Rotate, translateZ: -100 }}
        className="absolute inset-[-50%] w-[200%] h-[200%] [transform-style:preserve-3d]"
      >
        {/* GEAR — top-left */}
        <div className="absolute left-[15%] top-[10%] w-[30vw] opacity-80 -rotate-12">
          <GearDrawing />
        </div>
        {/* HOUSING — right side */}
        <div className="absolute right-[10%] top-[40%] w-[35vw] opacity-70 rotate-6">
          <HousingDrawing />
        </div>
        {/* TOLERANCE — bottom right */}
        <div className="absolute left-[55%] top-[75%] w-[18vw] opacity-70 rotate-[22deg]">
          <ToleranceZoneDrawing />
        </div>
      </motion.div>

      {/* ========== LAYER 2 — Mid-deep ========== */}
      <motion.div
        style={{ y: layer2Y, rotateZ: layer2Rotate, translateZ: 0 }}
        className="absolute inset-[-50%] w-[200%] h-[200%] [transform-style:preserve-3d]"
      >
        {/* BRACKET — top-right area */}
        <div className="absolute left-[60vw] top-[5%] w-[20vw] opacity-80">
          <BracketDrawing />
        </div>
        {/* SHAFT — left side, rotated */}
        <div className="absolute left-[-5vw] top-[40%] w-[35vw] opacity-75 rotate-[15deg]">
          <ShaftDrawing />
        </div>
        {/* TOLERANCE — bottom middle */}
        <div className="absolute right-[25vw] top-[70%] w-[14vw] opacity-80 -rotate-6">
          <ToleranceZoneDrawing />
        </div>
      </motion.div>

      {/* ========== LAYER 3 — Mid-close ========== */}
      <motion.div
        style={{ y: layer3Y, translateZ: 100 }}
        className="absolute inset-[-50%] w-[200%] h-[200%] [transform-style:preserve-3d]"
      >
        {/* DIMENSION — center area */}
        <div className="absolute left-[30vw] top-[20%] w-[18vw] opacity-85">
          <DimensionDetailDrawing />
        </div>
        {/* GEAR — bottom-left */}
        <div className="absolute left-[5vw] top-[65%] w-[22vw] opacity-75 -rotate-[8deg]">
          <GearDrawing />
        </div>
      </motion.div>

      {/* ========== LAYER 4 — Closest: fast-moving, most visible ========== */}
      <motion.div
        style={{ y: layer4Y, rotateZ: layer4Rotate, translateZ: 200 }}
        className="absolute inset-[-50%] w-[200%] h-[200%] [transform-style:preserve-3d]"
      >
        {/* SHAFT — wide, bottom */}
        <div className="absolute left-[35vw] top-[80%] w-[35vw] opacity-90 -rotate-3">
          <ShaftDrawing />
        </div>
        {/* BRACKET — top-left */}
        <div className="absolute left-[10vw] top-[-5%] w-[18vw] opacity-80 rotate-[20deg]">
          <BracketDrawing />
        </div>
        {/* DIMENSION — right side */}
        <div className="absolute right-[8vw] top-[35%] w-[14vw] opacity-85 rotate-[45deg]">
          <DimensionDetailDrawing />
        </div>
      </motion.div>

      {/* Edge fade gradients for content legibility */}
      <div className="absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      <div className="absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
};
