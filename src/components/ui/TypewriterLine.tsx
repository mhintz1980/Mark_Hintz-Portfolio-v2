import { useEffect, useState, useRef } from 'react';

interface TypewriterLineProps {
  text: string;
  delay?: number;
  speed?: number; // ms per char
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

/**
 * Types text character-by-character with a blinking cursor.
 */
export const TypewriterLine = ({
  text,
  delay = 0,
  speed = 38,
  className = '',
  showCursor = false,
  onComplete,
}: TypewriterLineProps) => {
  const [rendered, setRendered] = useState('');
  const [done, setDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      if (cancelled) return;
      if (charIndex <= text.length) {
        setRendered(text.slice(0, charIndex));
        charIndex++;
        timer = setTimeout(type, speed);
      } else {
        setDone(true);
        onCompleteRef.current?.();
      }
    };

    const startTimer = setTimeout(type, delay);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [text, delay, speed]);

  // Blink cursor
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, [showCursor]);

  return (
    <span className={className}>
      {rendered}
      {showCursor && (
        <span
          className={`inline-block w-[2px] h-[1em] bg-accent-primary ml-[2px] align-middle transition-opacity duration-100 ${
            cursorVisible && !done ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </span>
  );
};
