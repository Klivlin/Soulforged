import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

type ProcessProps = {
  content: {
    process: {
      title: string;
      steps: Array<{ id: string; title: string; desc: string }>;
    };
  };
};

export function Process({ content }: ProcessProps) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || !trackRef.current || !lineRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const steps = gsap.utils.toArray<HTMLElement>('.process-step');

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: 0.6,
        },
      });

      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 65%',
          end: 'bottom 45%',
          onEnter: () => step.classList.add('process-step--active'),
          onLeave: () => step.classList.remove('process-step--active'),
          onEnterBack: () => step.classList.add('process-step--active'),
          onLeaveBack: () => step.classList.remove('process-step--active'),
        });

        gsap.from(step, {
          x: -24,
          duration: 0.6,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="process" id="process" ref={rootRef}>
      <div className="process__header">
        <div className="section-label">
          <span>[02]</span>
          <span>PROCESS</span>
          <span>ACTIVE</span>
        </div>
        <h2 className="process__title">{content.process.title}</h2>
      </div>

      <div className="process__terminal" aria-hidden="true">
        <span className="process__prompt">&gt; INIT SEQUENCE</span>
        <span className="process__cursor" />
      </div>

      <div className="process__track" ref={trackRef}>
        <div className="process__line" ref={lineRef} aria-hidden="true" />
        {content.process.steps.map((step) => (
          <div key={step.id} className="process-step">
            <div className="process-step__marker" aria-hidden="true" />
            <div className="process-step__head">
              <span className="process-step__prompt">&gt;</span>
              <span className="process-step__id">STEP_{step.id}</span>
              <span className="process-step__status" aria-label="status" />
            </div>
            <h3 className="process-step__title">{step.title}</h3>
            <p className="process-step__desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
