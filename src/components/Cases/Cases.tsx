import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Barcode } from '../../effects/Barcode';
import './Cases.css';

gsap.registerPlugin(ScrollTrigger);

type CasesProps = {
  content: {
    cases: {
      title: string;
      items: Array<{
        id: string;
        title: string;
        type: string;
        year: string;
        role: string;
        summary: string;
        stack: string[];
      }>;
    };
  };
};

export function Cases({ content }: CasesProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.case-card', {
        y: 60,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.cases__grid',
          start: 'top 80%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cases" id="cases" ref={rootRef}>
      <div className="cases__header">
        <div className="section-label">
          <span>[03]</span>
          <span>CASES</span>
          <span>ACTIVE</span>
        </div>
        <h2 className="cases__title">{content.cases.title}</h2>
      </div>

      <div className="cases__grid">
        {content.cases.items.map((caseItem) => (
          <article key={caseItem.id} className="case-card">
            <div className="case-card__preview">
              <div className="case-card__grid-bg" aria-hidden="true" />
              <div className="case-card__preview-text" aria-hidden="true">
                {caseItem.type.split(' ')[0].toUpperCase()}
              </div>
              <div className="case-card__scan-overlay" aria-hidden="true" />
              <div className="case-card__barcode">
                <Barcode height={28} bars={[2, 1, 3, 2, 1, 4, 1, 2, 3, 1]} />
              </div>
            </div>
            <div className="case-card__content">
              <div className="case-card__meta">
                <span>{caseItem.type}</span>
                <span>•</span>
                <span>{caseItem.year}</span>
                <span className="case-card__id">{caseItem.id}</span>
              </div>
              <h3 className="case-card__title">{caseItem.title}</h3>
              <p className="case-card__role">{caseItem.role}</p>
              <p className="case-card__summary">{caseItem.summary}</p>
              <div className="case-card__stack">
                {caseItem.stack.map((tech) => (
                  <span key={tech} className="stack-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
