import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/khushii-logo.png';

/*
 * Timeline (ms) — CSS drives each step; these mark the hand-offs.
 * ring draws → coral fills → character peeks in (3 beats) → settle
 * → coral circle expands to fill the screen → coral melts into paper → page.
 */
const EXPAND_AT = 2150;
const WASH_AT = 2750;
const DONE_AT = 3250;
const REDUCED_DONE_AT = 700;

/**
 * Full-screen logo intro. The ring and fill are drawn to match the logo's own
 * geometry and coral; the untouched logo asset is revealed on top, so the final
 * frame is the exact mark. Plays on every page load; minimal under reduced motion.
 */
export const IntroLoader = ({ onDone }) => {
  const [phase, setPhase] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'static' : 'draw'
  );
  const rootRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = rootRef.current;
    const html = document.documentElement;
    html.classList.add('intro-lock');

    // How far the coral circle must grow to cover the whole viewport from the centre
    const size = root.querySelector('.intro__stage').getBoundingClientRect().width || 1;
    root.style.setProperty('--cover', String((Math.hypot(window.innerWidth, window.innerHeight) / size) * 1.08));

    const finish = () => {
      html.classList.remove('intro-lock');
      onDoneRef.current?.();
    };

    if (reduced) {
      const t = window.setTimeout(finish, REDUCED_DONE_AT);
      return () => { window.clearTimeout(t); html.classList.remove('intro-lock'); };
    }

    const timers = [
      window.setTimeout(() => setPhase('expand'), EXPAND_AT),
      window.setTimeout(() => setPhase('wash'), WASH_AT),
      window.setTimeout(finish, DONE_AT),
    ];
    return () => {
      timers.forEach(window.clearTimeout);
      html.classList.remove('intro-lock');
    };
  }, []);

  return (
    <div ref={rootRef} className={`intro intro--${phase}`} aria-hidden="true">
      <div className="intro__stage">
        <span className="intro__fill" />
        <span className="intro__burst" />
        <svg className="intro__ring" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45.7" pathLength="1" />
        </svg>
        <div className="intro__window">
          <img className="intro__logo" src={logo} alt="" draggable="false" />
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
