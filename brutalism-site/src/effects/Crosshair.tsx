import { useEffect } from 'react';
import './Crosshair.css';

export function Crosshair() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.matchMedia('(max-width: 768px)').matches) return;

    const hLine = document.querySelector<HTMLElement>('.crosshair__h');
    const vLine = document.querySelector<HTMLElement>('.crosshair__v');
    const dot = document.querySelector<HTMLElement>('.crosshair__dot');
    if (!hLine || !vLine || !dot) return;

    const move = (e: MouseEvent) => {
      hLine.style.top = `${e.clientY}px`;
      vLine.style.left = `${e.clientX}px`;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="crosshair" aria-hidden="true">
      <div className="crosshair__h" />
      <div className="crosshair__v" />
      <div className="crosshair__dot" />
    </div>
  );
}
