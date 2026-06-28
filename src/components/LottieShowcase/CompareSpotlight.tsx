import { useState } from 'react';
import { LottiePlayer } from '../../effects/LottiePlayer';
import wireframeRadar from '../../animations/wireframe-radar.json';
import './CompareSpotlight.css';

type CompareSpotlightProps = {
  tag: string;
  title: string;
  desc: string;
};

export function CompareSpotlight({ tag, title, desc }: CompareSpotlightProps) {
  const [motionOn, setMotionOn] = useState(false);
  const [flash, setFlash] = useState(false);

  const activate = () => {
    setFlash(true);
    setMotionOn(true);
    setTimeout(() => setFlash(false), 600);
  };

  return (
    <article className={`compare-spotlight ${motionOn ? 'is-live' : ''} ${flash ? 'is-flash' : ''}`}>
      <div className="compare-spotlight__bg" aria-hidden="true" />
      <div className="compare-spotlight__scan" aria-hidden="true" />

      <div className="compare-spotlight__meta">
        <span className="compare-spotlight__tag">{tag}</span>
        <h3 className="compare-spotlight__title">{title}</h3>
        <p className="compare-spotlight__desc">{desc}</p>
      </div>

      <div className="compare-spotlight__arena">
        <div className={`compare-spotlight__panel compare-spotlight__panel--static ${motionOn ? 'is-dimmed' : ''}`}>
          <span className="compare-spotlight__label">STATIC / SVG</span>
          <div className="compare-spotlight__icon-stage">
            <svg className="compare-spotlight__svg-icon" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" />
              <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
              <path
                d="M60 28 L72 52 L98 56 L78 74 L83 100 L60 86 L37 100 L42 74 L22 56 L48 52 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="miter"
              />
              <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.35" />
            </svg>
            <span className="compare-spotlight__dead-badge">NO MOTION</span>
          </div>
        </div>

        <div className="compare-spotlight__vs" aria-hidden="true">
          <span>VS</span>
          <div className="compare-spotlight__vs-line" />
        </div>

        <div className={`compare-spotlight__panel compare-spotlight__panel--lottie ${motionOn ? 'is-active' : ''}`}>
          <span className="compare-spotlight__label">LOTTIE / VECTOR</span>
          <div className="compare-spotlight__icon-stage">
            <div className="compare-spotlight__glow" aria-hidden="true" />
            <div className="compare-spotlight__glow compare-spotlight__glow--outer" aria-hidden="true" />
            <LottiePlayer animationData={wireframeRadar} size={120} vivid />
            <span className="compare-spotlight__live-badge">LIVE MOTION</span>
          </div>
        </div>
      </div>

      <div className="compare-spotlight__actions">
        <button
          type="button"
          className="compare-spotlight__cta"
          onClick={activate}
          disabled={motionOn}
        >
          {motionOn ? '◉ MOTION ACTIVE' : '▶ ACTIVATE MOTION'}
        </button>
        {motionOn && (
          <button type="button" className="compare-spotlight__reset" onClick={() => setMotionOn(false)}>
            RESET
          </button>
        )}
      </div>
    </article>
  );
}
