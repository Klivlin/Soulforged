import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlitchText } from '../../effects/GlitchText';
import { WireframeGrid } from '../../effects/WireframeGrid';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

type HeroContent = {
  hero: {
    titleLines: string[];
    accentLine?: number;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    bgWeb: string;
    bgSystem: string;
  };
};

type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let animationId: number;

    const tick = (now: number) => {
      frameCount.current += 1;
      if (now - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = now;
      }
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero__meta span', {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
      })
        .from(
          '.hero__title-line',
          {
            y: 60,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)',
            stagger: 0.1,
            duration: 0.9,
          },
          '-=0.2'
        )
        .from('.hero__text', { y: 24, duration: 0.7, immediateRender: false }, '-=0.4')
        .from('.hero__cta .btn', { y: 20, stagger: 0.1, duration: 0.5, immediateRender: false }, '-=0.3')
        .from('.hero__hud', { x: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__scanner', { scale: 0.8, opacity: 0, duration: 0.7 }, '-=0.5');

      gsap.to('.hero__content', {
        y: -80,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to('.hero__bg-text--web', {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [content]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { titleLines, accentLine = titleLines.length - 1 } = content.hero;

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <WireframeGrid />

      <div className="hero__bg-text hero__bg-text--web" aria-hidden="true">
        {content.hero.bgWeb}
      </div>
      <div className="hero__bg-text hero__bg-text--system" aria-hidden="true">
        {content.hero.bgSystem}
      </div>

      <div className="hero__hud corner-frame" aria-hidden="true">
        <div className="hero__hud-row">
          <span>COORD</span>
          <span>55.7558°N / 37.6173°E</span>
        </div>
        <div className="hero__hud-row">
          <span>FPS</span>
          <span>{fps}</span>
        </div>
        <div className="hero__hud-row">
          <span>BUILD</span>
          <span>v0.1.0-rc</span>
        </div>
        <div className="hero__hud-row">
          <span>STATUS</span>
          <span className="hero__hud-signal">
            <span className="hero__hud-dot" />
            SCANNING
          </span>
        </div>
      </div>

      <div className="hero__content">
        <div className="hero__meta">
          <span>[00]</span>
          <span>HERO</span>
          <span>ACTIVE</span>
        </div>

        <h1 className="hero__title">
          {titleLines.map((line, index) => (
            <span
              key={index}
              className={[
                'hero__title-line',
                index === accentLine ? 'hero__title-line--accent' : '',
                index === accentLine - 1 ? 'hero__title-line--outline' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {index === accentLine ? <GlitchText>{line}</GlitchText> : line}
            </span>
          ))}
        </h1>

        <p className="hero__text">{content.hero.text}</p>

        <div className="hero__cta">
          <button className="btn btn--primary" onClick={() => scrollToSection('contact')}>
            {content.hero.primaryCta}
          </button>
          <button className="btn btn--secondary" onClick={() => scrollToSection('process')}>
            {content.hero.secondaryCta}
          </button>
        </div>
      </div>

      <div className="hero__scanner" aria-hidden="true">
        <div className="scanner-line"></div>
        <div className="scanner-corner scanner-corner--tl"></div>
        <div className="scanner-corner scanner-corner--br"></div>
        <div className="scanner-label">
          <span>SCAN_01</span>
          <span className="scanner-dot"></span>
        </div>
      </div>
    </section>
  );
}
