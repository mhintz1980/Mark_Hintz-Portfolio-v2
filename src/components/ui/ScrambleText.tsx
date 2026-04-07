import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*/-+=.';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;        // ms before animation starts
  duration?: number;     // ms per character resolve time
  stagger?: number;      // ms between each char starting
}

export const ScrambleText = ({
  text,
  className = '',
  delay = 0,
  duration = 400,
  stagger = 40,
}: ScrambleTextProps) => {
  const [displayed, setDisplayed] = useState<string[]>(() =>
    text.split('').map((c) => (c === ' ' ? ' ' : CHARS[0]))
  );
  const resolvedRef = useRef<boolean[]>(text.split('').map(() => false));
  const frameRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (startedRef.current) return;
      startedRef.current = true;

      const chars = text.split('');
      const resolveChar = (index: number) => {
        if (index >= chars.length) return;

        // Skip spaces immediately
        if (chars[index] === ' ') {
          resolvedRef.current[index] = true;
          resolveChar(index + 1);
          return;
        }

        const startTime = performance.now();
        const target = chars[index].toUpperCase();

        const scramble = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);

          if (progress >= 1) {
            resolvedRef.current[index] = true;
            setDisplayed((prev) => {
              const next = [...prev];
              next[index] = chars[index]; // use original case
              return next;
            });
          } else {
            const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
            setDisplayed((prev) => {
              const next = [...prev];
              next[index] = randomChar;
              return next;
            });
            frameRef.current = requestAnimationFrame(scramble);
          }
        };

        frameRef.current = requestAnimationFrame(scramble);

        // Start next char after stagger
        setTimeout(() => resolveChar(index + 1), stagger);
      };

      resolveChar(0);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, duration, stagger]);

  return (
    <span className={className} aria-label={text}>
      {displayed.map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-colors duration-150 ${
            resolvedRef.current[i]
              ? 'text-inherit'
              : char === ' '
              ? ''
              : 'text-accent-primary/70'
          }`}
          style={{ minWidth: char === ' ' ? '0.35em' : undefined }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
