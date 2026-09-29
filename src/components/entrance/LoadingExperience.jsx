import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { MiniKhushii } from './MiniKhushii';
import logo from '../../assets/khushii-logo.png';

const NAME = 'Khushii';
// Mini Khushii settles once the name's letters have landed (ms), then waves.
const CHARACTER_ENTRANCE_DELAY = 1150;

// `ready` is false while the intro loader is on screen; the hero's entrance waits for it.
export const LoadingExperience = ({ ready = true }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [lettersLanded, setLettersLanded] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const characterReady = ready && modelLoaded && (lettersLanded || reducedMotion);

  useEffect(() => {
    if (!ready) return undefined;
    const timer = window.setTimeout(() => setLettersLanded(true), CHARACTER_ENTRANCE_DELAY);
    return () => window.clearTimeout(timer);
  }, [ready]);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="studio-shell">
      <header className="studio-nav">
        <a className="studio-nav__brand" href="#entrance" onClick={scrollToTop} aria-label="Home">
          <img className="brand-mark brand-mark--nav" src={logo} alt="" width="42" height="42" />
        </a>

        <nav className="studio-nav__links" aria-label="Main">
          <a href="#work" onClick={(event) => scrollToSection(event, 'work')}>Work</a>
          <a href="#about" onClick={(event) => scrollToSection(event, 'about')}>About</a>
          <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>Contact</a>
        </nav>
      </header>

      <main className="studio-stage" aria-labelledby="studio-title">
        <div className="studio-hero">
          {/* Wordmark lockup: Mini Khushii is anchored to the name, not the viewport */}
          <div className="studio-hero__wordmark">
            <div
              className={`studio-character ${characterReady ? 'is-ready' : ''}`}
              role="img"
              aria-label="Mini Khushii standing beside the name"
            >
              <MiniKhushii
                width={370}
                height={445}
                scale={0.62}
                wave={characterReady && !reducedMotion}
                onLoaded={() => setModelLoaded(true)}
              />
            </div>

            <h1 id="studio-title" className="studio-stage__title">
              <span className="studio-stage__greeting">Hi, I’m</span>
              <span className="studio-stage__name">
                <span className="sr-only">{NAME}</span>
                {NAME.split('').map((letter, index) => (
                  <span key={index} className="studio-stage__letter" style={{ '--i': index }} aria-hidden="true">
                    {letter}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <section className="studio-stage__intro" aria-label="Introduction">
            <p>Experience Designer · Design + Marketing</p>
            <span>I design experiences, systems and interactions that make ideas feel more human.</span>
          </section>

          <a className="studio-stage__action" href="#work" onClick={(event) => scrollToSection(event, 'work')}>
            Explore work <ArrowDown className="studio-stage__action-arrow" size={15} strokeWidth={2.4} />
          </a>
        </div>
      </main>
    </div>
  );
};

export default LoadingExperience;
