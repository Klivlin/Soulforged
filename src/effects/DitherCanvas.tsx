import { useEffect, useRef } from 'react';
import './DitherCanvas.css';

export function DitherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      draw();
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cellSize = 4;

      ctx.clearRect(0, 0, w, h);

      for (let y = 0; y < h; y += cellSize) {
        for (let x = 0; x < w; x += cellSize) {
          const cx = x / w - 0.5;
          const cy = y / h - 0.5;
          const dist = Math.sqrt(cx * cx + cy * cy);
          const wave =
            Math.sin(x * 0.02 + y * 0.015) * 0.3 +
            Math.cos(dist * 8) * 0.4 +
            0.5;

          const threshold = wave;
          const bayer = [
            [0, 8, 2, 10],
            [12, 4, 14, 6],
            [3, 11, 1, 9],
            [15, 7, 13, 5],
          ];
          const bx = Math.floor(x / cellSize) % 4;
          const by = Math.floor(y / cellSize) % 4;
          const dither = bayer[by][bx] / 16;

          if (threshold > dither) {
            ctx.fillStyle = 'rgba(237, 232, 221, 0.55)';
            ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
          }
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="dither-canvas" aria-hidden="true" />;
}
