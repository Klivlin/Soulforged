import { useLayoutEffect, useRef, useState } from 'react';
import type { LottieRefCurrentProps } from 'lottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LottiePlayer } from '../../effects/LottiePlayer';
import wireframeRadar from '../../animations/wireframe-radar.json';
import spinnerLoad from '../../animations/spinner-load.json';
import checkSuccess from '../../animations/check-success.json';
import errorAlert from '../../animations/error-alert.json';
import rocketLaunch from '../../animations/rocket-launch.json';
import stickerStar from '../../animations/sticker-star.json';
import { CompareSpotlight } from './CompareSpotlight';
import './LottieShowcase.css';

gsap.registerPlugin(ScrollTrigger);

type LottieLabItem = {
  id: string;
  tag: string;
  title: string;
  desc: string;
};

type LottieShowcaseProps = {
  content: {
    lottieLab: {
      title: string;
      subtitle: string;
      items: LottieLabItem[];
    };
  };
};

type IndicatorState = 'loading' | 'success' | 'error';
type TabId = 'home' | 'work' | 'profile';
type FormState = 'idle' | 'focus' | 'error' | 'submit' | 'success';

function item(items: LottieLabItem[], id: string) {
  return items.find((i) => i.id === id)!;
}

export function LottieShowcase({ content }: LottieShowcaseProps) {
  const rootRef = useRef<HTMLElement>(null);
  const btnLottieRef = useRef<LottieRefCurrentProps>(null);
  const { lottieLab } = content;
  const replaceItem = item(lottieLab.items, 'replace');

  const [btnPressed, setBtnPressed] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [launchActive, setLaunchActive] = useState(false);
  const [indicator, setIndicator] = useState<IndicatorState>('loading');
  const [cardOpen, setCardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [altTheme, setAltTheme] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [formValue, setFormValue] = useState('');

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.lottie-lab__title', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
      });

      gsap.from('.compare-spotlight', {
        scale: 0.96,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.compare-spotlight', start: 'top 88%' },
      });

      gsap.from('.lottie-lab__cell', {
        y: 48,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.lottie-lab__grid', start: 'top 82%' },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const indicatorAnim =
    indicator === 'loading' ? spinnerLoad : indicator === 'success' ? checkSuccess : errorAlert;

  const tabIcons: Record<TabId, object> = {
    home: wireframeRadar,
    work: spinnerLoad,
    profile: stickerStar,
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValue.trim()) {
      setFormState('error');
      return;
    }
    setFormState('submit');
    setTimeout(() => setFormState('success'), 1200);
  };

  return (
    <section className="lottie-lab" id="lottie-lab" ref={rootRef}>
      <div className="lottie-lab__aura" aria-hidden="true" />
      <div className="lottie-lab__grid-bg" aria-hidden="true" />

      <div className="lottie-lab__header">
        <div className="section-label">
          <span>[04B]</span>
          <span>LOTTIE LAB</span>
          <span>MOTION</span>
        </div>
        <h2 className="lottie-lab__title">{lottieLab.title}</h2>
        <p className="lottie-lab__subtitle">{lottieLab.subtitle}</p>
      </div>

      <div className="lottie-lab__grid">
        <CompareSpotlight tag={replaceItem.tag} title={replaceItem.title} desc={replaceItem.desc} />

        <article className="lottie-lab__cell lottie-lab__cell--hot">
          <span className="lottie-lab__tag">{item(lottieLab.items, 'btn').tag}</span>
          <h3 className="lottie-lab__cell-title">{item(lottieLab.items, 'btn').title}</h3>
          <p className="lottie-lab__cell-desc">{item(lottieLab.items, 'btn').desc}</p>
          <button
            type="button"
            className={`lottie-lab__btn ${btnPressed ? 'lottie-lab__btn--pressed' : ''}`}
            onMouseEnter={() => btnLottieRef.current?.setSpeed(2)}
            onMouseLeave={() => {
              btnLottieRef.current?.setSpeed(1);
              setBtnPressed(false);
            }}
            onClick={() => {
              setBtnPressed(true);
              btnLottieRef.current?.goToAndPlay(0, true);
            }}
          >
            <LottiePlayer animationData={wireframeRadar} size={32} lottieRef={btnLottieRef} />
            <span>{btnPressed ? 'SENT' : 'PUSH'}</span>
          </button>
        </article>

        <article className="lottie-lab__cell">
          <span className="lottie-lab__tag">{item(lottieLab.items, 'skeleton').tag}</span>
          <h3 className="lottie-lab__cell-title">{item(lottieLab.items, 'skeleton').title}</h3>
          <p className="lottie-lab__cell-desc">{item(lottieLab.items, 'skeleton').desc}</p>
          <div className={`lottie-lab__skeleton-card ${skeletonLoading ? 'is-loading' : 'is-loaded'}`}>
            {skeletonLoading ? (
              <>
                <div className="lottie-lab__sk-line lottie-lab__sk-line--lg" />
                <div className="lottie-lab__sk-line" />
                <div className="lottie-lab__sk-line lottie-lab__sk-line--sm" />
                <LottiePlayer animationData={spinnerLoad} size={36} className="lottie-lab__sk-spinner" />
              </>
            ) : (
              <>
                <strong>Project Alpha</strong>
                <p>Landing · React · GSAP</p>
                <span className="lottie-lab__sk-badge">LOADED</span>
              </>
            )}
          </div>
          <button type="button" className="lottie-lab__mini-btn" onClick={() => setSkeletonLoading((v) => !v)}>
            {skeletonLoading ? 'LOAD DATA' : 'RESET'}
          </button>
        </article>

        <article className="lottie-lab__cell lottie-lab__cell--hot">
          <span className="lottie-lab__tag">{item(lottieLab.items, 'launch').tag}</span>
          <h3 className="lottie-lab__cell-title">{item(lottieLab.items, 'launch').title}</h3>
          <p className="lottie-lab__cell-desc">{item(lottieLab.items, 'launch').desc}</p>
          <div className={`lottie-lab__phone ${launchActive ? 'is-launching' : ''}`}>
            <div className="lottie-lab__phone-screen">
              {launchActive ? (
                <LottiePlayer animationData={rocketLaunch} size={80} loop={false} vivid />
              ) : (
                <span className="lottie-lab__phone-logo">[SYS]</span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="lottie-lab__mini-btn lottie-lab__mini-btn--glow"
            onClick={() => {
              setLaunchActive(true);
              setTimeout(() => setLaunchActive(false), 2500);
            }}
          >
            LAUNCH APP
          </button>
        </article>

        <article className="lottie-lab__cell">
          <span className="lottie-lab__tag">{item(lottieLab.items, 'states').tag}</span>
          <h3 className="lottie-lab__cell-title">{item(lottieLab.items, 'states').title}</h3>
          <p className="lottie-lab__cell-desc">{item(lottieLab.items, 'states').desc}</p>
          <div className="lottie-lab__state-tabs">
            {(['loading', 'success', 'error'] as IndicatorState[]).map((s) => (
              <button
                key={s}
                type="button"
                className={indicator === s ? 'is-active' : ''}
                onClick={() => setIndicator(s)}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="lottie-lab__state-display">
            <LottiePlayer
              key={indicator}
              animationData={indicatorAnim}
              size={64}
              loop={indicator === 'loading'}
              vivid
            />
            <span>
              {indicator === 'loading' ? 'PROCESSING…' : indicator === 'success' ? 'OK' : 'ERR_01'}
            </span>
          </div>
        </article>

        <article className="lottie-lab__cell">
          <span className="lottie-lab__tag">{item(lottieLab.items, 'interactive').tag}</span>
          <h3 className="lottie-lab__cell-title">{item(lottieLab.items, 'interactive').title}</h3>
          <p className="lottie-lab__cell-desc">{item(lottieLab.items, 'interactive').desc}</p>
          <button
            type="button"
            className={`lottie-lab__expand-card ${cardOpen ? 'is-open' : ''}`}
            onClick={() => setCardOpen((v) => !v)}
          >
            <div className="lottie-lab__expand-head">
              <LottiePlayer animationData={stickerStar} size={36} />
              <span>CARD MODULE</span>
            </div>
            {cardOpen && <p className="lottie-lab__expand-body">{item(lottieLab.items, 'interactive').desc}</p>}
          </button>
        </article>

        <article className="lottie-lab__cell">
          <span className="lottie-lab__tag">{item(lottieLab.items, 'tabs').tag}</span>
          <h3 className="lottie-lab__cell-title">{item(lottieLab.items, 'tabs').title}</h3>
          <p className="lottie-lab__cell-desc">{item(lottieLab.items, 'tabs').desc}</p>
          <nav className="lottie-lab__tabs">
            {(['home', 'work', 'profile'] as TabId[]).map((tab) => (
              <button
                key={tab}
                type="button"
                className={activeTab === tab ? 'is-active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                <LottiePlayer
                  animationData={tabIcons[tab]}
                  size={28}
                  loop={activeTab === tab}
                  autoplay={activeTab === tab}
                />
                {tab.toUpperCase()}
              </button>
            ))}
          </nav>
        </article>

        <article className="lottie-lab__cell">
          <span className="lottie-lab__tag">{item(lottieLab.items, 'stickers').tag}</span>
          <h3 className="lottie-lab__cell-title">{item(lottieLab.items, 'stickers').title}</h3>
          <p className="lottie-lab__cell-desc">{item(lottieLab.items, 'stickers').desc}</p>
          <div className="lottie-lab__stickers">
            {[wireframeRadar, stickerStar, checkSuccess, spinnerLoad].map((anim, i) => (
              <div key={i} className="lottie-lab__sticker">
                <LottiePlayer animationData={anim} size={52} />
              </div>
            ))}
          </div>
        </article>

        <article className="lottie-lab__cell">
          <span className="lottie-lab__tag">{item(lottieLab.items, 'theme').tag}</span>
          <h3 className="lottie-lab__cell-title">{item(lottieLab.items, 'theme').title}</h3>
          <p className="lottie-lab__cell-desc">{item(lottieLab.items, 'theme').desc}</p>
          <div className={`lottie-lab__theme-box ${altTheme ? 'is-alt' : ''}`}>
            <div className="lottie-lab__theme-lottie">
              <LottiePlayer animationData={stickerStar} size={72} />
            </div>
          </div>
          <button type="button" className="lottie-lab__mini-btn" onClick={() => setAltTheme((v) => !v)}>
            {altTheme ? 'THEME A' : 'THEME B'}
          </button>
        </article>

        <article className="lottie-lab__cell lottie-lab__cell--wide">
          <span className="lottie-lab__tag">{item(lottieLab.items, 'form').tag}</span>
          <h3 className="lottie-lab__cell-title">{item(lottieLab.items, 'form').title}</h3>
          <p className="lottie-lab__cell-desc">{item(lottieLab.items, 'form').desc}</p>
          <form className="lottie-lab__form" onSubmit={handleFormSubmit}>
            <div className={`lottie-lab__field lottie-lab__field--${formState}`}>
              <input
                type="text"
                placeholder="email@studio.com"
                value={formValue}
                onChange={(e) => {
                  setFormValue(e.target.value);
                  setFormState('focus');
                }}
                onBlur={() => {
                  if (formState !== 'error' && formState !== 'submit') setFormState('idle');
                }}
              />
              <div className="lottie-lab__field-icon">
                {formState === 'submit' && <LottiePlayer animationData={spinnerLoad} size={28} />}
                {formState === 'error' && <LottiePlayer animationData={errorAlert} size={28} loop={false} />}
                {formState === 'success' && <LottiePlayer animationData={checkSuccess} size={28} loop={false} />}
                {formState === 'focus' && <LottiePlayer animationData={wireframeRadar} size={28} />}
                {formState === 'idle' && <span className="lottie-lab__field-idle">_</span>}
              </div>
            </div>
            {formState === 'error' && <span className="lottie-lab__field-err">ERR_FIELD_REQUIRED</span>}
            <button type="submit" className="lottie-lab__mini-btn lottie-lab__mini-btn--glow">
              SUBMIT
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
