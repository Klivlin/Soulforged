import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Barcode } from '../../effects/Barcode';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

type ContactProps = {
  content: {
    contact: {
      title: string;
      text: string;
      fields: Record<string, string>;
      button: string;
      info: { email: string; telegram: string; location: string };
    };
  };
};

export function Contact({ content }: ContactProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    project: '',
    budget: '',
    timeline: '',
  });

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact__form', {
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.contact__title', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! (This is a demo)');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact" id="contact" ref={rootRef}>
      <div className="contact__header">
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <span>[06]</span>
          <span>CONTACT</span>
          <span>ACTIVE</span>
        </div>
        <h2 className="contact__title">{content.contact.title}</h2>
        <p className="contact__subtitle">{content.contact.text}</p>
      </div>

      <div className="contact__container">
        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__form-tag">&gt; INPUT_STREAM</div>

          <div className="form-group">
            <label className="form-label" htmlFor="name">
              {content.contact.fields.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact">
              {content.contact.fields.contact}
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="form-input"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="project">
              {content.contact.fields.project}
            </label>
            <textarea
              id="project"
              name="project"
              className="form-textarea"
              value={formData.project}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="budget">
                {content.contact.fields.budget}
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                className="form-input"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="timeline">
                {content.contact.fields.timeline}
              </label>
              <input
                type="text"
                id="timeline"
                name="timeline"
                className="form-input"
                value={formData.timeline}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="form-submit">
            <span>&gt;</span> {content.contact.button}
          </button>
        </form>

        <div className="contact__info">
          <a href={`mailto:${content.contact.info.email}`}>{content.contact.info.email}</a>
          <a
            href={`https://t.me/${content.contact.info.telegram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.contact.info.telegram}
          </a>
          <span>{content.contact.info.location}</span>
        </div>

        <div className="contact__barcode">
          <Barcode height={60} bars={[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4]} />
        </div>
      </div>
    </section>
  );
}
