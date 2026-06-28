import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LottieAnim } from '../../effects/LottieAnim';
import { Barcode } from '../../effects/Barcode';
import './Manifest.css';

gsap.registerPlugin(ScrollTrigger);

type ManifestProps = {
  content: {
    manifest: {
      stackWord: string;
      verticalLabel: string;
      quote: string;
      subquote: string;
      stamps: string[];
    };
  };
};

export function Manifest({ content }: ManifestProps) {
  const rootRef = useRef<HTMLElement>(null);
  const { stackWord, verticalLabel, quote, subquote, stamps } = content.manifest;

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.manifest__stack-line', {
        x: -30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      });

      gsap.from('.manifest__quote-block', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.manifest__quote-block', start: 'top 85%' },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="manifest" id="manifest" ref={rootRef}>
      <div className="manifest__grid">
        <div className="manifest__stack">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`manifest__stack-line ${i > 0 ? 'manifest__stack-line--ghost' : ''}`}
            >
              {stackWord}
            </span>
          ))}
        </div>

        <div className="manifest__center">
          <div className="manifest__quote-block corner-frame">
            <p className="manifest__quote">{quote}</p>
            <p className="manifest__subquote">{subquote}</p>
            <div className="manifest__stamps">
              {stamps.map((stamp) => (
                <span key={stamp} className="manifest__stamp">{stamp}</span>
              ))}
            </div>
          </div>

          <div className="manifest__lottie-panel">
            <LottieAnim size={180} />
            <Barcode height={24} bars={[2, 1, 3, 1, 2, 4, 1, 3, 2, 1]} />
          </div>
        </div>

        <div className="manifest__vertical" aria-hidden="true">
          <span className="manifest__vertical-text">{verticalLabel}</span>
          <span className="manifest__vertical-num">911</span>
        </div>
      </div>
    </section>
  );
}
