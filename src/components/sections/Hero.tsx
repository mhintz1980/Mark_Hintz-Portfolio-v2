import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { portfolioData, wordCycleData } from "../../data/portfolioData";
import { useState, useEffect } from "react";
import { TypewriterLine } from "../ui/TypewriterLine";

// ─── Spec terminal typewriter ─────────────────────────────────────────────────
const specLines = [
  { label: "> SPEC:", value: portfolioData.personal.name },
  { label: "> ROLE:", value: "Mechanical Designer + Automation Engineer" },
  { label: "> TOL:", value: '±0.0005" | 15 YRS | JAX, FL' },
  { label: "> STATUS:", value: "AVAILABLE FOR WORK", highlight: true },
  { label: "> STACK:", value: "SolidWorks · PDM · Python · AI Tooling" },
];

const CHAR_SPEED = 28;
const LINE_START = 2200; // ms — after CTAs appear

const SpecTerminal = ({ show }: { show: boolean }) => {
  const delays: number[] = [];
  let acc = LINE_START;
  for (const line of specLines) {
    delays.push(acc);
    acc += (line.label.length + line.value.length) * CHAR_SPEED + 80;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="font-mono text-sm leading-relaxed mt-8 p-6
        bg-white/50 dark:bg-slate-800/50 backdrop-blur
        border border-secondary/20 border-l-[3px] border-l-accent-primary
        rounded-sm shadow-sm max-w-[540px] relative overflow-hidden"
    >
      {specLines.map((line, i) => (
        <div key={i} className="flex">
          <span className="text-accent-primary font-medium mr-2 shrink-0">
            {show && (
              <TypewriterLine
                text={line.label}
                delay={delays[i]}
                speed={CHAR_SPEED}
              />
            )}
          </span>
          <span
            className={
              line.highlight ? "text-emerald-500 font-medium" : "text-primary"
            }
          >
            {show && (
              <TypewriterLine
                text={line.value}
                delay={delays[i] + line.label.length * CHAR_SPEED + 20}
                speed={CHAR_SPEED}
                showCursor={i === specLines.length - 1}
              />
            )}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

// ─── Velocity Z-Depth animation variants ──────────────────────────────────────
const lineVariants = {
  hidden: {
    opacity: 0,
    scale: 1.35,
    z: -120,
    filter: "blur(12px)",
    y: 18,
  },
  visible: {
    opacity: 1,
    scale: 1,
    z: 0,
    filter: "blur(0px)",
    y: 0,
  },
};

const lineTransition = {
  type: "spring" as const,
  stiffness: 65,
  damping: 14,
  mass: 1.1,
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentWord, setCurrentWord] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % wordCycleData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const line1 = portfolioData.personal.title.line1; // "Precision Engineering."
  const line2 = portfolioData.personal.title.line2; // "Automated Logic."

  // Reduced motion fallback: skip 3D completely
  const reducedHidden = { opacity: 0 };
  const reducedVisible = { opacity: 1 };

  return (
    <section
      id="top"
      className="min-h-[100dvh] flex flex-col justify-center py-32 relative z-10 w-full max-w-7xl mx-auto px-8 md:px-20"
    >
      {/* ── Eyebrow — simple fade-up, no 3D ── */}
      <motion.div
        className="font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-secondary mb-8"
        initial={shouldReduceMotion ? reducedHidden : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      >
        {portfolioData.personal.superHeader}
      </motion.div>

      {/* ── Cinematic 3D headline block ── */}
      <div className="mb-12 max-w-max space-y-3 relative" style={{ perspective: "800px" }}>
        {/* Line 1 */}
        <motion.div
          className="text-6xl md:text-8xl font-extrabold leading-[1.1] tracking-[-0.04em] text-primary pr-4 md:pr-6"
          variants={lineVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          transition={{ ...lineTransition, delay: 0.3 }}
        >
          {line1}
        </motion.div>

        {/* Line 2 */}
        <motion.div
          className="text-6xl md:text-8xl font-extrabold leading-[1.1] tracking-[-0.04em] text-primary pr-4 md:pr-6"
          variants={lineVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          transition={{ ...lineTransition, delay: 0.72 }}
        >
          {line2}
        </motion.div>

        {/* ── Accent underline — scaleX reveal after both lines land ── */}
        <motion.div
          aria-hidden="true"
          className="bg-linear-to-r from-accent-primary/60 via-accent-primary/20 to-transparent h-px w-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.7,
            ease: [0.32, 0.72, 0, 1],
          }}
        />
      </div>

      {/* ── Rotating word pill ── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        className="bg-accent-primary/5 border border-accent-primary/10 rounded-sm p-6 mb-12 max-w-5xl"
      >
        <div className="text-lg md:text-xl font-normal leading-relaxed text-primary">
          <span>
            Bridging the gap between SolidWorks design and high-efficiency{" "}
          </span>
          {/* Keep 'production through' + rotating word on the same line */}
          <span className="inline-flex items-center gap-x-2 flex-nowrap">
            <span>production through</span>
            <span className="text-accent-primary font-bold relative inline-flex overflow-hidden h-[1.4em] items-center min-w-[22ch]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordCycleData[currentWord]}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="absolute whitespace-nowrap"
                >
                  {wordCycleData[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </div>
      </motion.div>

      {/* ── CTA buttons ── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.0 }}
        className="flex flex-wrap items-center gap-4 mb-4"
      >
        {portfolioData.heroActions.map((action, i) => (
          <motion.a
            key={i}
            href={action.href}
            target={action.target}
            className={`
              inline-flex items-center justify-center px-7 py-3.5 
              text-[15px] rounded-sm transition-all
              ${
                action.primary
                  ? "font-heading font-bold uppercase tracking-widest bg-accent-primary text-white hover:bg-accent-primary/90 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] border-none"
                  : "font-semibold bg-white/50 dark:bg-slate-800/50 backdrop-blur text-primary border border-secondary/20 hover:border-accent-primary hover:text-accent-primary shadow-sm"
              }
            `}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            {action.label}
          </motion.a>
        ))}
      </motion.div>

      {/* ── BONUS: Spec terminal typewriter ── */}
      <SpecTerminal show={showContent} />
    </section>
  );
};
