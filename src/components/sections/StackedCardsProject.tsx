import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, type MotionValue } from 'framer-motion';
import { buildProjectMediaItems } from './projects-media';

type StackProject = {
  title: string;
  category: string;
  outcome?: string;
  tags: string[];
  image: string;
  gallery?: string[];
};

const resolveSrc = (src: string) => `${import.meta.env.BASE_URL}${src}`;

const INTRO_PROGRESS = 0.08;
const OUTRO_PROGRESS = 0.04;
const EXIT_WINDOW_RATIO = 0.86;

const STACK_FRAME_LIMIT = 6;

export const getStackCardProgressState = (progress: number, index: number, total: number) => {
  const available = 1 - INTRO_PROGRESS - OUTRO_PROGRESS;
  const slot = available / Math.max(total, 1);
  const start = INTRO_PROGRESS + index * slot;
  const end = start + slot * EXIT_WINDOW_RATIO;
  const rawExit = (progress - start) / Math.max(end - start, 0.0001);
  const exit = Math.min(1, Math.max(0, rawExit));
  const completedSlots = Math.max(0, (progress - INTRO_PROGRESS) / slot);
  const depth = Math.max(0, index - completedSlots);
  const opacity = progress >= end ? 0 : Math.max(0, 1 - exit * 1.15);

  return { start, end, exit, depth, opacity };
};

export const getStackProjectMediaItems = (project: StackProject) =>
  buildProjectMediaItems(project).slice(0, STACK_FRAME_LIMIT);

export const StackedCardsProject = ({
  project,
  projectIndex,
  projectCount,
}: {
  project: StackProject;
  projectIndex: number;
  projectCount: number;
}) => {
  const reduce = useReducedMotion() ?? false;
  const mediaItems = getStackProjectMediaItems(project);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const progressBar = useTransform(smooth, [0, 1], ['0%', '100%']);

  // Reduced-motion fallback: a clean stacked grid.
  if (reduce) {
    return (
      <section className="mb-32">
        <Header project={project} projectIndex={projectIndex} projectCount={projectCount} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {mediaItems.map((item) => (
            <img
              key={item.src}
              src={resolveSrc(item.src)}
              alt={`${project.title} — ${item.label}`}
              className="w-full aspect-[4/3] object-cover border border-white/10"
              loading="lazy"
            />
          ))}
        </div>
      </section>
    );
  }

  // Allocate scroll budget: a short setup beat, one viewport per card, then release.
  const sectionHeight = `${(mediaItems.length + 1) * 100}vh`;

  // Drag-to-scrub: pointer delta translates into window scroll
  const dragStateRef = useRef<{ active: boolean; lastY: number; lastX: number; pointerId: number | null }>({
    active: false, lastY: 0, lastX: 0, pointerId: null,
  });

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragStateRef.current = { active: true, lastY: e.clientY, lastX: e.clientX, pointerId: e.pointerId };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragStateRef.current;
    if (!s.active || s.pointerId !== e.pointerId) return;
    const dy = e.clientY - s.lastY;
    const dx = e.clientX - s.lastX;
    s.lastY = e.clientY;
    s.lastX = e.clientX;
    // Drag up or left advances forward through the stack
    const delta = Math.abs(dy) >= Math.abs(dx) ? -dy : -dx;
    if (delta !== 0) window.scrollBy({ top: delta, behavior: 'auto' });
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragStateRef.current;
    if (s.pointerId === e.pointerId) {
      s.active = false;
      s.pointerId = null;
      try { (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId); } catch { /* noop */ }
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="stacked-project"
      className="relative mb-32 w-full"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 z-20">
          <motion.div
            style={{ width: progressBar }}
            className="h-full bg-gradient-to-r from-secondary via-accent-primary to-secondary"
          />
        </div>

        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 px-6 md:px-16 py-20">
          <div className="flex flex-col justify-center max-w-xl">
            <Header project={project} projectIndex={projectIndex} projectCount={projectCount} />
            <p className="mt-6 text-sm text-secondary font-mono uppercase tracking-[0.2em] dark:text-white/60">
              Scroll or drag — peel through the stack
            </p>
          </div>

          <div
            className="relative w-full h-full min-h-[420px] touch-none cursor-grab active:cursor-grabbing select-none"
            style={{ perspective: '1600px' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
              {mediaItems.map((item, i) => (
                <StackCard
                  key={item.src}
                  src={resolveSrc(item.src)}
                  index={i}
                  total={mediaItems.length}
                  progress={smooth}
                  caption={item.label}
                  overlayLabel={item.overlayLabel}
                  title={project.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Header = ({
  project,
  projectIndex,
  projectCount,
}: {
  project: StackProject;
  projectIndex: number;
  projectCount: number;
}) => (
  <div>
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary mb-4">
      Project Review Stack {String(projectIndex + 1).padStart(2, '0')} / {String(projectCount).padStart(2, '0')}
    </p>
    <h3 className="text-3xl md:text-5xl font-semibold leading-tight text-primary dark:text-white">
      {project.title}
    </h3>
    <p className="mt-3 text-sm md:text-base text-secondary dark:text-white/60">{project.category}</p>
    {project.outcome ? (
      <p className="mt-4 text-base md:text-lg text-primary/80 dark:text-white/85 italic">
        “{project.outcome}”
      </p>
    ) : null}
    <div className="mt-5 flex flex-wrap gap-2">
      {project.tags.map((t) => (
        <span
          key={t}
          className="border border-secondary/20 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-secondary dark:border-white/15 dark:text-white/70"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

type StackCardProps = {
  src: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  caption: string;
  overlayLabel: string;
  title: string;
};

const StackCard = ({ src, index, total, progress, caption, overlayLabel, title }: StackCardProps) => {
  const STEP_Y = 42;
  const STEP_X = 26;
  const STEP_Z = -70;
  const STEP_SCALE = 0.06;
  const STEP_ROTATE = -2;

  const cardTransform = useTransform(progress, (p) => {
    const { depth, exit } = getStackCardProgressState(p, index, total);
    const exitY = -135 * exit;
    const rotateX = -42 * exit;
    const scale = 1 - depth * STEP_SCALE + exit * 0.025;

    return [
      `translate3d(${depth * STEP_X}px, calc(${depth * STEP_Y}px + ${exitY}%), ${depth * STEP_Z}px)`,
      `rotateX(${rotateX}deg)`,
      `rotate(${depth * STEP_ROTATE}deg)`,
      `scale(${scale})`,
    ].join(' ');
  });

  const opacity = useTransform(progress, (p) => getStackCardProgressState(p, index, total).opacity);

  return (
    <motion.div
      style={{
        transform: cardTransform,
        opacity,
        zIndex: 100 - index,
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 50%',
      }}
      className="absolute inset-x-0 top-0 h-[78%] overflow-hidden rounded-sm border border-white/15 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      data-stack-card={index}
    >
      <img
        src={src}
        alt={`${title} — ${caption}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading={index === 0 ? 'eager' : 'lazy'}
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            {overlayLabel}
          </p>
          <p className="mt-1 text-white text-sm md:text-base font-medium">{caption}</p>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
          {title}
        </div>
      </div>
    </motion.div>
  );
};

export default StackedCardsProject;
