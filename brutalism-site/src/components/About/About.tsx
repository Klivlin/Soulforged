import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DitherCanvas } from '../../effects/DitherCanvas';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

type AboutProps = {
  content: {
    about: {
      title: string;
      text: string;
      principles: string[];
    };
  };
};

export function About({ content }: AboutProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.principle', {
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about__principles',
          start: 'top 85%',
        },
      });

      gsap.from('.about__visual', {
        scale: 0.92,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about__visual',
          start: 'top 85%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={rootRef}>
      <div className="about__header">
        <div className="section-label">
          <span>[05]</span>
          <span>ABOUT</span>
          <span>ACTIVE</span>
        </div>
        <h2 className="about__title">{content.about.title}</h2>
      </div>

      <div className="about__content">
        <div>
          <p className="about__text">{content.about.text}</p>

          <div className="about__principles">
            {content.about.principles.map((principle, index) => (
              <div key={index} className="principle">
                {principle}
              </div>
            ))}
          </div>
        </div>

        <div className="about__visual corner-frame" aria-hidden="true">
          <DitherCanvas />
          <div className="about__visual-text">
            DIGITAL<br />SYSTEMS
          </div>
        </div>
      </div>
    </section>
  );
}
