import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextScramble } from '../../effects/TextScramble';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

type ServicesProps = {
  content: {
    services: {
      title: string;
      items: Array<{ id: string; title: string; desc: string }>;
    };
  };
};

export function Services({ content }: ServicesProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.service-module', {
        x: -40,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.services__list',
          start: 'top 85%',
        },
      });

      gsap.from('.services__title', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services" id="services" ref={rootRef}>
      <div className="services__header">
        <div className="section-label">
          <span>[01]</span>
          <span>SERVICES</span>
          <span>ACTIVE</span>
        </div>
        <h2 className="services__title">{content.services.title}</h2>
      </div>

      <div className="services__list">
        {content.services.items.map((service, index) => (
          <article key={service.id} className="service-module" data-service-card>
            <div className="service-module__index">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="service-module__body">
              <h3 className="service-module__title">
                <TextScramble>{service.title}</TextScramble>
              </h3>
              <p className="service-module__desc">{service.desc}</p>
            </div>
            <div className="service-module__meta">
              <span className="service-module__id">{service.id}</span>
              <span className="service-module__arrow">→</span>
            </div>
            <div className="service-module__scan" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
