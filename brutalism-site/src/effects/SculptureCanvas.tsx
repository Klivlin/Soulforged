import { useEffect, useRef } from 'react';
import { BUST_PATH, BUST_VIEWBOX, BUST_WIREFRAME_LINES } from './sculpturePath';
import './SculptureCanvas.css';

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function SculptureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.35 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const path = new Path2D(BUST_PATH);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    wrap.addEventListener('mousemove', onMove);

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    let phase = 0;
    let scanY = 0;
    let animationId = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const pad = 24;
      const scale = Math.min((w - pad * 2) / BUST_VIEWBOX.w, (h - pad * 2) / BUST_VIEWBOX.h);
      const ox = (w - BUST_VIEWBOX.w * scale) / 2;
      const oy = (h - BUST_VIEWBOX.h * scale) / 2;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(scale, scale);

      const cell = 4;
      const mx = mouse.current.x * BUST_VIEWBOX.w;
      const my = mouse.current.y * BUST_VIEWBOX.h;

      for (let y = 0; y < BUST_VIEWBOX.h; y += cell) {
        for (let x = 0; x < BUST_VIEWBOX.w; x += cell) {
          if (!ctx.isPointInPath(path, x, y)) continue;

          const light =
            0.22 +
            (1 - x / BUST_VIEWBOX.w) * 0.28 +
            (1 - y / BUST_VIEWBOX.h) * 0.22 +
            Math.sin(x * 0.04 + y * 0.03 + phase) * 0.06;

          const dist = Math.hypot(x - mx, y - my);
          const hover = dist < 90 ? (1 - dist / 90) * 0.18 : 0;
          const threshold = Math.min(0.95, light + hover);

          const bx = Math.floor(x / cell) % 4;
          const by = Math.floor(y / cell) % 4;
          const dither = BAYER[by][bx] / 16;

          const scanDist = Math.abs(y - scanY);
          const scanBoost = scanDist < 18 ? (1 - scanDist / 18) * 0.35 : 0;

          if (threshold + scanBoost > dither) {
            const nearScan = scanDist < 10;
            ctx.fillStyle = nearScan
              ? 'rgba(129, 1, 0, 0.85)'
              : 'rgba(237, 232, 221, 0.72)';
            ctx.fillRect(x, y, cell - 1, cell - 1);
          }
        }
      }

      ctx.strokeStyle = 'rgba(237, 232, 221, 0.12)';
      ctx.lineWidth = 0.8;
      for (let y = 0; y < BUST_VIEWBOX.h; y += 14) {
        const wave = Math.sin(y * 0.05 + phase * 2) * 6;
        ctx.beginPath();
        let drawing = false;
        for (let x = 0; x <= BUST_VIEWBOX.w; x += 2) {
          const py = y + wave * Math.sin(x * 0.02);
          if (ctx.isPointInPath(path, x, py)) {
            if (!drawing) {
              ctx.moveTo(x, py);
              drawing = true;
            } else {
              ctx.lineTo(x, py);
            }
          } else if (drawing) {
            ctx.stroke();
            ctx.beginPath();
            drawing = false;
          }
        }
        if (drawing) ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(129, 1, 0, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 8]);
      ctx.lineDashOffset = -phase * 40;
      ctx.stroke(path);

      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(237, 232, 221, 0.35)';
      ctx.lineWidth = 1;
      BUST_WIREFRAME_LINES.forEach((line) => {
        const wire = new Path2D(line);
        ctx.stroke(wire);
      });

      ctx.restore();

      ctx.save();
      ctx.strokeStyle = 'rgba(129, 1, 0, 0.7)';
      ctx.lineWidth = 1;
      ctx.shadowColor = 'rgba(129, 1, 0, 0.8)';
      ctx.shadowBlur = 8;
      const scanScreenY = oy + scanY * scale;
      ctx.beginPath();
      ctx.moveTo(0, scanScreenY);
      ctx.lineTo(w, scanScreenY);
      ctx.stroke();
      ctx.restore();

      if (!prefersReducedMotion) {
        phase += 0.012;
        scanY = (scanY + 1.8) % BUST_VIEWBOX.h;
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      wrap.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="sculpture-canvas-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} className="sculpture-canvas" aria-hidden="true" />
      <div className="sculpture-canvas__hud">
        <span>HALFTONE</span>
        <span className="sculpture-canvas__hud-dot" />
        <span>LIVE</span>
      </div>
    </div>
  );
}