import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import wireframeRadar from '../animations/wireframe-radar.json';
import './LottieAnim.css';

type LottieAnimProps = {
  variant?: 'radar' | 'pulse';
  className?: string;
  size?: number;
};

export function LottieAnim({ variant = 'radar', className = '', size = 200 }: LottieAnimProps) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!reduced);
  }, []);

  if (!enabled) {
    return (
      <div className={`lottie-fallback ${className}`} style={{ width: size, height: size }} aria-hidden="true">
        <svg viewBox="0 0 200 200" className="lottie-fallback__svg">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(237,232,221,0.3)" strokeWidth="1" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(237,232,221,0.2)" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" stroke="rgba(237,232,221,0.25)" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  const data = variant === 'radar' ? wireframeRadar : wireframeRadar;

  return (
    <div className={`lottie-wrap ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <Lottie animationData={data} loop autoplay style={{ width: size, height: size }} />
    </div>
  );
}
