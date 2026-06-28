import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Barcode } from '../../effects/Barcode';
import { Starburst } from '../../effects/Starburst';
import './PhilosophyGrid.css';

gsap.registerPlugin(ScrollTrigger);

type PhilosophyGridProps = {
  content: {
    philosophy: {
      title: string;
      definition: { word: string; text: string };
      cells: Array<{ type: string; content: string }>;
    };
  };
};

export function PhilosophyGrid({ content }: PhilosophyGridProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.philosophy__cell', {
        scale: 0.95,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.philosophy__grid', start: 'top 85%' },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="philosophy" id="philosophy" ref={rootRef}>
      <div className="philosophy__header">
        <div className="section-label">
          <span>[04A]</span>
          <span>PHILOSOPHY</span>
          <span>ACTIVE</span>
        </div>
        <h2 className="philosophy__title">{content.philosophy.title}</h2>
      </div>

      <div className="philosophy__grid">
        <div className="philosophy__cell philosophy__cell--definition">
          <div className="philosophy__def-colors" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div>
            <span className="philosophy__def-word">{content.philosophy.definition.word}</span>
            <p className="philosophy__def-text">{content.philosophy.definition.text}</p>
          </div>
        </div>

        <div className="philosophy__cell philosophy__cell--starburst">
          <Starburst />
        </div>

        <div className="philosophy__cell philosophy__cell--halftone" aria-hidden="true">
          <div className="philosophy__halftone" />
          <span className="philosophy__halftone-label">INTERFACE</span>
        </div>

        <div className="philosophy__cell philosophy__cell--barcode">
          <Barcode height={80} bars={[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1]} />
          <span className="philosophy__barcode-label">MADE BY SYSTEM</span>
        </div>

        {content.philosophy.cells.map((cell, i) => (
          <div key={i} className="philosophy__cell philosophy__cell--text">
            <span className="philosophy__cell-type">{cell.type}</span>
            <p>{cell.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
