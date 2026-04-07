import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { portfolioData, wordCycleData } from "../../data/portfolioData";
import { useState, useEffect } from "react";
import { TypewriterLine } from "../ui/TypewriterLine";

// ─── Blueprint reveal: clip-path sweeps left→right like a drafting arm ─────────
interface BlueprintLineProps {
  text: string;
  className?: string;
  delay?: number; // seconds
  duration?: number; // seconds
  showArm?: boolean; // render the drafting arm cursor
}

const BlueprintLine = ({
  text,
  className = "",
  delay = 0,
  duration = 0.65,
  showArm = false,
}: BlueprintLineProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{text}</div>;
  }

  return (
    <div className="relative overflow-visible">
      {/* ── Drafting arm cursor ─────────────────────────────── */}
      {showArm && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-accent-primary/70 z-20"
          style={{ left: 0 }}
          initial={{ left: "0%", opacity: 0 }}
          animate={{
            left: ["0%", "100%", "100%"],
            opacity: [0.35, 1, 0],
          }}
          transition={{
            delay,
            duration: duration + 0.06,
            ease: [0.0, 0, 0.5, 1],
            times: [0, 0.45, 0.75],
          }}
        />
      )}

      {/* ── Text with clip-path reveal ──────────────────────── */}
      <motion.div
        className={className}
        style={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{
          delay,
          duration,
          ease: [0.16, 1, 0.3, 1], // custom "heavy start, fast finish" ease
        }}
      >
        {text}
      </motion.div>

      {/* ── Baseline tick mark (blueprint aesthetic) ────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-[3px] left-0 h-px bg-accent-primary/30"
        initial={{ scaleX: 0, originX: "0%" }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: delay + duration * 0.3,
          duration: duration * 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

// ─── Crosshair corner marks (blueprint registration marks) ───────────────────
const CornerMark = ({ className }: { className: string }) => (
  <motion.div
    aria-hidden="true"
    className={`absolute w-4 h-4 ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.4, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.3, ease: "backOut" }}
  >
    <div className="absolute top-0 left-0 w-full h-px bg-accent-primary/60" />
    <div className="absolute top-0 left-0 h-full w-px bg-accent-primary/60" />
  </motion.div>
);

// ─── Spec terminal typewriter ─────────────────────────────────────────────────
const specLines = [
  { label: "> SPEC:", value: portfolioData.personal.name },
  { label: "> ROLE:", value: "Mechanical Designer + Automation Engineer" },
  { label: "> TOL:", value: '±0.0005" | 15 YRS | JAX, FL' },
  { label: "> STATUS:", value: "AVAILABLE FOR WORK", highlight: true },
  { label: "> STACK:", value: "SolidWorks · PDM · Python · AI Tooling" },
];

const CHAR_SPEED = 28;
const LINE_START = 1600; // ms — after headline is fully revealed

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

  // Timing for sequential reveals (half-speed)
  const line1Delay = 0.3; // seconds
  const line1Dur = 1.5;
  const line2Delay = line1Delay + line1Dur * 0.3; // ~1.44s
  const line2Dur = 1.5;

  return (
    <section
      id="top"
      className="min-h-[100dvh] flex flex-col justify-center py-32 relative z-10 w-full max-w-7xl mx-auto px-8 md:px-20"
    >
      {/* ── Eyebrow — also clip-path reveals ── */}
      <motion.div
        className="font-mono text-[14px] font-medium uppercase tracking-[0.1em] text-secondary mb-8 overflow-hidden"
        style={shouldReduceMotion ? {} : { clipPath: "inset(0 100% 0 0)" }}
        animate={shouldReduceMotion ? {} : { clipPath: "inset(0 0% 0 0)" }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {portfolioData.personal.superHeader}
      </motion.div>

      {/* ── Blueprint headline block ── */}
      <div className="mb-12 max-w-max space-y-3 relative">
        {/* Registration corner marks */}
        {!shouldReduceMotion && (
          <>
            <CornerMark className="top-0 left-0 -translate-x-5 -translate-y-5" />
            <CornerMark className="bottom-0 left-0 -translate-x-5 translate-y-5 rotate-90" />
          </>
        )}

        {/* Line 1 */}
        <BlueprintLine
          text={line1}
          className="text-6xl md:text-8xl font-extrabold leading-[1.1] tracking-[-0.04em] text-primary pr-4 md:pr-6"
          delay={line1Delay}
          duration={line1Dur}
          showArm
        />

        {/* Line 2 */}
        <BlueprintLine
          text={line2}
          className="text-6xl md:text-8xl font-extrabold leading-[1.1] tracking-[-0.04em] text-primary pr-4 md:pr-6"
          delay={line2Delay}
          duration={line2Dur}
          showArm
        />
      </div>

      {/* ── Rotating word pill ── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 3.2 }}
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
        transition={{ duration: 0.5, delay: 3.5 }}
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
