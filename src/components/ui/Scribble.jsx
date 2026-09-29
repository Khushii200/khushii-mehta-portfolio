import React from 'react';

/**
 * A hand-drawn coral underline for one key word in a heading.
 * Wrap the word: <Scribbled>word</Scribbled>. Used sparingly (one per section).
 */
export const Scribbled = ({ children }) => (
  <span className="scribbled">
    {children}
    <svg className="scribbled__mark" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
      <path d="M3 13 C 42 5, 92 4, 132 9 S 184 15, 197 7" />
    </svg>
  </span>
);

/** Editorial section label, e.g. <SectionLabel number={1}>Work</SectionLabel> → "01 / Work" */
export const SectionLabel = ({ number, children, className = '' }) => (
  <p className={`section-eyebrow ${className}`}>
    <span className="section-eyebrow__num">{String(number).padStart(2, '0')}</span> / {children}
  </p>
);

export default Scribbled;
