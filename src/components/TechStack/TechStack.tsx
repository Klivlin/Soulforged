import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TechStack.css';

gsap.registerPlugin(ScrollTrigger);

type TechStackProps = {
  content: {
    stack: {
      title: string;
      groups: Array<{
        layer: string;
        tools: string;
        purpose: string;
        status: string;
      }>;
    };
  };
};

export function TechStack({ content }: TechStackProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.tech-table tbody tr', {
        x: -30,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.tech-table',
          start: 'top 82%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tech-stack" id="stack" ref={rootRef}>
      <div className="tech-stack__header">
        <div className="section-label">
          <span>[04]</span>
          <span>STACK</span>
          <span>ACTIVE</span>
        </div>
        <h2 className="tech-stack__title">{content.stack.title}</h2>
      </div>

      <div className="tech-table-wrap">
        <table className="tech-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Tools</th>
              <th>Purpose</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {content.stack.groups.map((group, index) => (
              <tr key={index}>
                <td>{group.layer}</td>
                <td>{group.tools}</td>
                <td>{group.purpose}</td>
                <td>
                  <span className="tech-table__status">
                    {group.status}
                    <span className="tech-table__cursor" aria-hidden="true" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
