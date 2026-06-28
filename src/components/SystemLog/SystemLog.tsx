import { useEffect, useRef, useState } from 'react';
import './SystemLog.css';

type SystemLogProps = {
  content: {
    systemLog: {
      title: string;
      lines: string[];
    };
  };
};

export function SystemLog({ content }: SystemLogProps) {
  const [lines, setLines] = useState(content.systemLog.lines.slice(0, 6));
  const indexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const allLines = content.systemLog.lines;
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % allLines.length;
      const next = allLines[indexRef.current];
      setLines((prev) => [...prev.slice(-7), next]);
    }, 2200);

    return () => clearInterval(interval);
  }, [content.systemLog.lines]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section className="system-log-wrap" id="system-log-section" aria-label={content.systemLog.title}>
      <section className="system-log" aria-label={content.systemLog.title}>
      <div className="system-log__header">
        <span className="system-log__dot" />
        <span className="system-log__title">{content.systemLog.title}</span>
        <span className="system-log__cursor" aria-hidden="true" />
      </div>
      <div className="system-log__body" ref={containerRef}>
        {lines.map((line, i) => (
          <div key={`${line}-${i}`} className="system-log__line">
            <span className="system-log__prefix">&gt;</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
      </section>
    </section>
  );
}
