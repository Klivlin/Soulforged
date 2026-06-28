import { useEffect, useState, type RefObject } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import './LottiePlayer.css';

type LottiePlayerProps = {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  size?: number;
  className?: string;
  lottieRef?: RefObject<LottieRefCurrentProps | null>;
  /** Showcase mode: always animate + red glow via box-shadow (no CSS filter) */
  vivid?: boolean;
};

export function LottiePlayer({
  animationData,
  loop = true,
  autoplay = true,
  size = 48,
  className = '',
  lottieRef,
  vivid = false,
}: LottiePlayerProps) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (vivid) {
      setEnabled(true);
      return;
    }
    setEnabled(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, [vivid]);

  const wrapClass = [
    'lottie-player',
    vivid ? 'lottie-player--vivid' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (!enabled) {
    return (
      <div
        className={`lottie-player-fallback ${className}`}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        aria-hidden="true"
      >
        <span className="lottie-player-fallback__dot" />
      </div>
    );
  }

  return (
    <div
      className={wrapClass}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-hidden="true"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        renderer="svg"
        style={{ width: size, height: size, display: 'block', background: 'transparent' }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid meet',
          progressiveLoad: false,
          hideOnTransparent: true,
        }}
      />
    </div>
  );
}
