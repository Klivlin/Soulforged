import { Barcode } from '../../effects/Barcode';
import { MarqueeTicker } from '../../effects/MarqueeTicker';
import './Header.css';

type HeaderProps = {
  content: {
    nav: Record<string, string>;
    status: { online: string };
    hero: { primaryCta: string };
  };
  onLanguageToggle: () => void;
  currentLang: string;
};

export function Header({ content, onLanguageToggle, currentLang }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <div className="header__logo">[AGENCY]</div>
          <div className="header__status">
            <span className="status-dot"></span>
            {content.status.online}
          </div>
        </div>

        <nav className="header__nav">
          <button onClick={() => scrollToSection('services')}>{content.nav.services}</button>
          <button onClick={() => scrollToSection('process')}>{content.nav.process}</button>
          <button onClick={() => scrollToSection('cases')}>{content.nav.cases}</button>
          <button onClick={() => scrollToSection('stack')}>{content.nav.stack}</button>
          <button onClick={() => scrollToSection('lottie-lab')}>{content.nav.motion}</button>
          <button onClick={() => scrollToSection('contact')}>{content.nav.contact}</button>
        </nav>

        <div className="header__right">
          <button className="lang-toggle" onClick={onLanguageToggle}>
            {currentLang.toUpperCase()}
          </button>
          <button className="cta-btn" onClick={() => scrollToSection('contact')}>
            {content.hero.primaryCta}
          </button>
        </div>

        <div className="header__barcode">
          <Barcode height={20} />
        </div>
      </div>
      <MarqueeTicker />
    </header>
  );
}
