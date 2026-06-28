import { useEffect, useRef } from 'react';
import './TextScramble.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>[]';

type TextScrambleProps = {
  children: string;
  className?: string;
};

export function TextScramble({ children, className = '' }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef<number>(0);
  const original = useRef(children);

  useEffect(() => {
    original.current = children;
    if (ref.current) ref.current.textContent = children;
  }, [children]);

  const scramble = () => {
    const el = ref.current;
    if (!el) return;

    const target = original.current;
    let iteration = 0;
    cancelAnimationFrame(frame.current);

    const animate = () => {
      el.textContent = target
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return target[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      if (iteration < target.length) {
        iteration += 0.4;
        frame.current = requestAnimationFrame(animate);
      } else {
        el.textContent = target;
      }
    };

    animate();
  };

  return (
    <span ref={ref} className={`text-scramble ${className}`} onMouseEnter={scramble}>
      {children}
    </span>
  );
}
