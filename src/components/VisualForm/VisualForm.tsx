import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SculptureCanvas } from '../../effects/SculptureCanvas';
import './VisualForm.css';

gsap.registerPlugin(ScrollTrigger);

type VisualFormProps = {
  content: {
    visualForm: {
      title: string;
      verticalLabel: string;
      scanStatus: string;
      layerTag: string;
      intro: string;
      pillars: Array<{ id: string; title: string; text: string }>;
    };
  };
};

export function VisualForm({ content }: VisualFormProps) {
  const rootRef = useRef<HTMLElement>(null);
  const { visualForm } = content;

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.visual-form__portrait', {
        scale: 0.94,
        duration: 1.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.visual-form__portrait', start: 'top 85%' },
      });

      gsap.from('.visual-form__pillar', {
        y: 28,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.visual-form__pillars', start: 'top 88%' },
      });

      gsap.from('.visual-form__intro', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.visual-form__copy', start: 'top 85%' },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="visual-form" id="visual-form" ref={rootRef}>
      <div className="visual-form__header">
        <div className="section-label">
          <span>[03A]</span>
          <span>FORM</span>
          <span>RENDER</span>
        </div>
        <h2 className="visual-form__title">{visualForm.title}</h2>
      </div>

      <div className="visual-form__layout">
        <div className="visual-form__side" aria-hidden="true">
          <span className="visual-form__vertical">{visualForm.verticalLabel}</span>
        </div>

        <div className="visual-form__portrait corner-frame">
          <SculptureCanvas />
          <div className="visual-form__portrait-meta">
            <span>{visualForm.scanStatus}</span>
            <span>{visualForm.layerTag}</span>
          </div>
        </div>

        <div className="visual-form__copy">
          <p className="visual-form__intro">{visualForm.intro}</p>

          <div className="visual-form__pillars">
            {visualForm.pillars.map((pillar) => (
              <article key={pillar.id} className="visual-form__pillar">
                <span className="visual-form__pillar-id">{pillar.id}</span>
                <h3 className="visual-form__pillar-title">{pillar.title}</h3>
                <p className="visual-form__pillar-text">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
