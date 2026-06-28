import { useEffect, useRef } from 'react';
import './WireframeGrid.css';

type WireframeGridProps = {
  scrollY?: number;
};

export function WireframeGrid({ scrollY = 0 }: WireframeGridProps) {
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
    };

    resize();
    window.addEventListener('resize', resize);

    const gridSize = 30;
    const gridDepth = 20;
    const perspective = 500;
    const offsetY = scrollY * 0.3;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(237, 232, 221, 0.4)';
      ctx.lineWidth = 1;

      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2 + offsetY;

      // Draw grid lines
      for (let z = 0; z < gridDepth; z++) {
        for (let x = -10; x <= 10; x++) {
          const x1 = x * gridSize;
          const z1 = z * gridSize;
          const x2 = x * gridSize;
          const z2 = (z + 1) * gridSize;

          // Add wave effect
          const wave1 = Math.sin((x1 * 0.05) + (z1 * 0.05) + Date.now() * 0.0005) * 20;
          const wave2 = Math.sin((x2 * 0.05) + (z2 * 0.05) + Date.now() * 0.0005) * 20;

          // Project 3D to 2D
          const scale1 = perspective / (perspective + z1);
          const scale2 = perspective / (perspective + z2);

          const screenX1 = centerX + x1 * scale1;
          const screenY1 = centerY + wave1 * scale1;
          const screenX2 = centerX + x2 * scale2;
          const screenY2 = centerY + wave2 * scale2;

          ctx.beginPath();
          ctx.moveTo(screenX1, screenY1);
          ctx.lineTo(screenX2, screenY2);
          ctx.stroke();
        }
      }

      // Draw horizontal lines
      for (let z = 0; z < gridDepth; z++) {
        ctx.beginPath();
        for (let x = -10; x <= 10; x++) {
          const x1 = x * gridSize;
          const z1 = z * gridSize;
          const wave = Math.sin((x1 * 0.05) + (z1 * 0.05) + Date.now() * 0.0005) * 20;
          const scale = perspective / (perspective + z1);
          const screenX = centerX + x1 * scale;
          const screenY = centerY + wave * scale;

          if (x === -10) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      }
    };

    let animationId: number;
    const animate = () => {
      drawGrid();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [scrollY]);

  return <canvas ref={canvasRef} className="wireframe-canvas" aria-hidden="true" />;
}
