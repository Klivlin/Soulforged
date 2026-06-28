import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Manifest } from './components/Manifest/Manifest';
import { Services } from './components/Services/Services';
import { Process } from './components/Process/Process';
import { Cases } from './components/Cases/Cases';
import { VisualForm } from './components/VisualForm/VisualForm';
import { TechStack } from './components/TechStack/TechStack';
import { LottieShowcase } from './components/LottieShowcase/LottieShowcase';
import { PhilosophyGrid } from './components/PhilosophyGrid/PhilosophyGrid';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { SignalStrip } from './components/SignalStrip/SignalStrip';
import { SystemLog } from './components/SystemLog/SystemLog';
import { NoiseOverlay } from './effects/NoiseOverlay';
import { ScanLines } from './effects/ScanLines';
import { Crosshair } from './effects/Crosshair';
import { SectionDivider } from './effects/SectionDivider';
import { contentRu } from './data/content.ru';
import { contentEn } from './data/content.en';
import './styles/tokens.css';
import './styles/globals.css';

function App() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const content = lang === 'ru' ? contentRu : contentEn;

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'ru' ? 'en' : 'ru';
      document.documentElement.lang = next;
      return next;
    });
  };

  return (
    <>
      <NoiseOverlay />
      <ScanLines />
      <Crosshair />

      <Header
        content={content}
        onLanguageToggle={toggleLanguage}
        currentLang={lang}
      />

      <main>
        <Hero content={content} />
        <SectionDivider label="SECTOR_00 // MANIFEST" />
        <Manifest content={content} />
        <SignalStrip items={content.signalStrip.items} />
        <SectionDivider label="SECTOR_01 // SERVICES" />
        <Services content={content} />
        <SectionDivider label="SECTOR_02 // PROCESS" />
        <Process content={content} />
        <SectionDivider label="SECTOR_03 // WORK" />
        <Cases content={content} />
        <SectionDivider label="SECTOR_03A // FORM" />
        <VisualForm content={content} />
        <SectionDivider label="SECTOR_04 // STACK" />
        <TechStack content={content} />
        <SectionDivider label="SECTOR_04B // LOTTIE" />
        <LottieShowcase content={content} />
        <PhilosophyGrid content={content} />
        <SectionDivider label="SECTOR_05 // STUDIO" />
        <About content={content} />
        <SystemLog content={content} />
        <SectionDivider label="SECTOR_06 // CONTACT" />
        <Contact content={content} />
      </main>

      <Footer content={content} />
    </>
  );
}

export default App;
