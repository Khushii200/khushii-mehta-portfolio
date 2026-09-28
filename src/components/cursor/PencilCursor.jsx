import React, { useEffect, useRef } from 'react';

// What the pointer is over decides which hand-drawn marks appear. First match wins.
const MODES = [
  ['native', 'input, textarea, select, [contenteditable="true"]'],
  ['image', '[data-cursor="image"], .project-sheet__visual'],
  ['card', '[data-cursor="card"], .project-sheet'],
  ['nav', '[data-cursor="nav"], .studio-nav__links a'],
  ['button', '[data-cursor="button"], a[href], button, [role="button"], summary, label[for]'],
];

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const PRESS_MS = 130;

const modeFor = (target) => {
  if (!(target instanceof Element)) return 'default';
  const match = MODES.find(([, selector]) => target.closest(selector));
  return match ? match[0] : 'default';
};

/**
 * Global pencil-mark cursor: a tiny hand-drawn arrow that follows the pointer,
 * picks up a few sketch marks over interactive elements and presses on click.
 * Only active with a fine pointer; the native cursor is hidden only once the
 * pencil is actually drawing, so it stays as the fallback.
 */
export const PencilCursor = () => {
  const cursorRef = useRef(null);
  const tiltRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const tilt = tiltRef.current;
    if (!cursor || !tilt) return;

    const root = document.documentElement;
    const finePointer = window.matchMedia(FINE_POINTER);
    const reducedMotion = window.matchMedia(REDUCED_MOTION);

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let angle = 0;
    let lastX = 0;
    let frame = null;
    let visible = false;
    let pressTimer = null;
    let pressStart = 0;

    const draw = () => {
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      tilt.style.transform = `rotate(${angle}deg)`;
    };

    // Near-instant follow with a slight lean in the direction of travel
    const tick = () => {
      frame = null;
      current.x += (target.x - current.x) * 0.6;
      current.y += (target.y - current.y) * 0.6;
      const lean = Math.max(-6, Math.min(6, (target.x - lastX) * 0.35));
      lastX = target.x;
      angle += (lean - angle) * 0.18;
      draw();

      const settling = Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1 || Math.abs(angle) > 0.05;
      if (settling) frame = requestAnimationFrame(tick);
    };

    const show = () => {
      if (visible) return;
      visible = true;
      cursor.classList.add('is-visible');
      root.classList.add('has-pencil-cursor');
    };

    const hide = () => {
      visible = false;
      cursor.classList.remove('is-visible');
    };

    const setMode = (mode) => {
      const next = reducedMotion.matches && mode !== 'native' ? 'default' : mode;
      if (cursor.dataset.mode !== next) cursor.dataset.mode = next;
    };

    const handleMove = (event) => {
      if (event.pointerType === 'touch') return;
      target.x = event.clientX;
      target.y = event.clientY;

      if (!visible) {
        current.x = lastX = target.x;
        current.y = target.y;
        angle = 0;
        draw();
        show();
      }

      setMode(modeFor(event.target));

      if (reducedMotion.matches) {
        current.x = target.x;
        current.y = target.y;
        angle = 0;
        draw();
      } else if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    const handleDown = (event) => {
      if (event.pointerType === 'touch' || reducedMotion.matches) return;
      window.clearTimeout(pressTimer);
      pressStart = performance.now();
      cursor.classList.add('is-pressed');
    };

    // keep the press visible for at least PRESS_MS even on very quick clicks
    const handleUp = () => {
      const remaining = Math.max(0, PRESS_MS - (performance.now() - pressStart));
      pressTimer = window.setTimeout(() => cursor.classList.remove('is-pressed'), remaining);
    };

    const handleLeave = (event) => {
      if (!event.relatedTarget) hide();
    };

    const listeners = [
      [window, 'pointermove', handleMove],
      [window, 'pointerdown', handleDown],
      [window, 'pointerup', handleUp],
      [document, 'pointerout', handleLeave],
      [window, 'blur', hide],
    ];

    const enable = () => listeners.forEach(([el, type, fn]) => el.addEventListener(type, fn, { passive: true }));
    const disable = () => {
      listeners.forEach(([el, type, fn]) => el.removeEventListener(type, fn));
      hide();
      root.classList.remove('has-pencil-cursor');
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    };

    const sync = () => (finePointer.matches ? enable() : disable());
    sync();
    finePointer.addEventListener('change', sync);

    return () => {
      finePointer.removeEventListener('change', sync);
      disable();
      window.clearTimeout(pressTimer);
    };
  }, []);

  return (
    <div ref={cursorRef} className="pencil-cursor" data-mode="default" aria-hidden="true">
      <div ref={tiltRef} className="pencil-cursor__tilt">
        <div className="pencil-cursor__body">
          {/* drawn with the arrow's tip at (0, 0) */}
          <svg className="pencil-cursor__svg" viewBox="-7 -7 32 32" width="32" height="32" fill="none">
            <g className="pencil-cursor__arrow">
              <path d="M0 0 C4.6 4.8 9.4 9.9 15.1 15.5" />
              <path d="M0.2 0.3 C0.3 3.1 0.6 5.9 0.9 8.6" />
              <path d="M0.3 0.1 C3.1 0.3 5.7 0.6 8.5 1.1" />
              {/* faint second pass, like a pencil line gone over twice */}
              <path className="pencil-cursor__retrace" d="M0.7 0.4 C5.1 5.2 9.8 10.1 14.4 14.6" />
            </g>

            <g className="pencil-cursor__marks pencil-cursor__marks--motion">
              <path pathLength="1" d="M-2 -2.1 C-2.6 -2.7 -3.3 -3.4 -4 -4.1" />
              <path pathLength="1" d="M1.7 -2.5 C1.9 -3.3 2.1 -4.2 2.2 -5" />
              <path pathLength="1" d="M-2.6 1.7 C-3.4 1.8 -4.3 1.9 -5.1 2.1" />
            </g>

            <g className="pencil-cursor__marks pencil-cursor__marks--plus">
              <path pathLength="1" d="M13.1 0.4 C13.2 2.1 13.3 3.8 13.3 5.6" />
              <path pathLength="1" d="M10.6 3.1 C12.2 2.9 13.9 2.8 15.6 2.9" />
            </g>

            <g className="pencil-cursor__marks pencil-cursor__marks--underline">
              <path pathLength="1" d="M2.2 19.6 C5.4 18.3 9 20.7 13.6 19.1" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PencilCursor;
