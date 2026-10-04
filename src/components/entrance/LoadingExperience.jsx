import React, { useEffect, useRef, useState } from 'react';
import { MiniKhushii } from './MiniKhushii';
import logo from '../../assets/khushii-logo.png';

const FIRST = 'KHUSHII';
const LAST = 'MEHTA';
// Mini Khushii steps onto the name once its letters have landed (ms), then waves.
const CHARACTER_ENTRANCE_DELAY = 1150;

const scrollToSection = (event, id) => {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Letters = ({ text, offset = 0 }) =>
  text.split('').map((letter, index) => (
    <span key={index} className="hero__letter" style={{ '--i': index + offset }} aria-hidden="true">
      {letter}
    </span>
  ));

/**
 * The hero is a poster: KHUSHII top-left, MEHTA bottom-right, Mini Khushii standing on the T
 * of her own name, and the identity line set in the gap the split leaves.
 * `ready` is false while the intro loader is on screen; the hero's entrance waits for it.
 */
export const LoadingExperience = ({ ready = true }) => {
  const shellRef = useRef(null);
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

  // As the hero scrolls away the two halves of the name drift apart.
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || reducedMotion) return undefined;
    let frame = null;
    const update = () => {
      frame = null;
      const progress = Math.min(1, Math.max(0, window.scrollY / (shell.offsetHeight || 1)));
      shell.style.setProperty('--hero-scroll', progress.toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div ref={shellRef} className="hero">
      <header className="site-nav">
        <a
          className="site-nav__brand"
          href="#entrance"
          onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          aria-label="Home"
        >
          <img className="brand-mark brand-mark--nav" src={logo} alt="" width="42" height="42" />
          <span className="site-nav__name">Khushii Mehta</span>
        </a>

        <p className="site-nav__note" aria-hidden="true">Portfolio <span>—</span> 2026</p>

        <nav className="studio-nav__links" aria-label="Main">
          <a href="#work" onClick={(event) => scrollToSection(event, 'work')}><sup>01</sup>Work</a>
          <a href="#about" onClick={(event) => scrollToSection(event, 'about')}><sup>02</sup>About</a>
          <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')}><sup>03</sup>Contact</a>
        </nav>
      </header>

      <main className="hero__stage" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero__name">
          <span className="sr-only">Khushii Mehta</span>
          <span className="hero__line hero__line--first"><Letters text={FIRST} /></span>
          <span className="hero__line hero__line--last"><Letters text={LAST} offset={FIRST.length} /></span>

          {/* Mini Khushii stands on the flat top of the T in MEHTA */}
          <span
            className={`hero__character ${characterReady ? 'is-ready' : ''}`}
            role="img"
            aria-label="Mini Khushii, a 3D character, standing on top of the name"
          >
            <MiniKhushii
              width={300}
              height={480}
              lean={false}
              fit
              enableMouseLook={!reducedMotion}
              wave={characterReady && !reducedMotion}
              onLoaded={() => setModelLoaded(true)}
            />
            <span className="hero__fig" aria-hidden="true">
              fig. 01 — me, but smaller
              <svg className="hero__fig-arrow" viewBox="0 0 120 60" fill="none">
                <path d="M4 8 C 30 10, 62 20, 84 42" />
                <path d="M72 44 L 86 45 L 84 30" />
              </svg>
            </span>
          </span>
        </h1>

        <div className="hero__roles">
          <p className="hero__role hero__role--one">Experience Designer</p>
          <p className="hero__role hero__role--plus" aria-label="plus">
            <span aria-hidden="true">+</span>
            <svg className="hero__circle" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <path d="M52 6 C 22 4, 6 26, 8 52 C 10 80, 38 96, 62 92 C 86 88, 96 64, 92 40 C 88 18, 66 6, 40 10" pathLength="1" />
            </svg>
          </p>
          <p className="hero__role hero__role--two">Marketing</p>
        </div>

        <div className="hero__aside">
          <p className="hero__line-copy">I design experiences, systems and interactions that make ideas feel more human.</p>
          <a className="hero__cta" href="#work" onClick={(event) => scrollToSection(event, 'work')}>
            <span>See the work</span>
            <svg viewBox="0 0 64 16" fill="none" aria-hidden="true"><path d="M0 8 H 60 M 53 2 L 61 8 L 53 14" /></svg>
          </a>
        </div>

      </main>
    </div>
  );
};

export default LoadingExperience;
