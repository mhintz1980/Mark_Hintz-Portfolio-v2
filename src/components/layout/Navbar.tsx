import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';
import { portfolioData } from '../../data/portfolioData';
import { ThemeToggle } from '../ui/ThemeToggle';
import { cn } from '../../lib/utils';

const withBase = (href: string) => {
  if (!href.startsWith('/')) return href;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${href}`;
};

export const Navbar = () => {
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [manuallyOpen, setManuallyOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 40) setManuallyOpen(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const collapsed = scrolled && !manuallyOpen;
  const drawingLink = portfolioData.navigation.find((link) => link.label === 'Drawing');

  const spring = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 28, mass: 0.7 };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {collapsed ? (
        <motion.div
          key="collapsed"
          layout
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={spring}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          <ThemeToggle />
          <motion.button
            onClick={() => setManuallyOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Open menu"
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              'bg-surface/80 backdrop-blur-md border border-secondary/20',
              'shadow-lg shadow-black/10 text-primary',
              'hover:border-accent-primary/40 transition-colors'
            )}
          >
            <Plus size={22} weight="bold" />
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="expanded"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, scale: 0.9 }}
          transition={spring}
          className="fixed top-8 left-0 right-0 z-50 flex items-start justify-between px-8 pointer-events-none"
        >
          <nav
            className={cn(
              'pointer-events-auto mx-auto flex items-center gap-12 px-6 py-3 rounded-full'
            )}
          >
            <a
              href={withBase('/#top')}
              className="font-heading font-semibold text-lg uppercase tracking-wider text-primary whitespace-nowrap drop-shadow-sm"
            >
              {portfolioData.personal.name}
            </a>

            <div className="hidden md:flex items-center gap-8">
              {portfolioData.navigation.map((link) => (
                <a
                  key={link.label}
                  href={withBase(link.href)}
                  className="text-[15px] font-medium text-muted-foreground hover:text-accent-primary transition-colors relative group drop-shadow-sm"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            {drawingLink ? (
              <a
                href={withBase(drawingLink.href)}
                className="md:hidden text-[13px] font-mono uppercase tracking-[0.18em] text-accent-primary border border-accent-primary/30 px-3 py-1.5 rounded-sm"
              >
                Drawing
              </a>
            ) : null}
          </nav>

          <div className="pointer-events-auto absolute right-8 top-0">
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
