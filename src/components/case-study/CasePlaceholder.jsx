import React from 'react';

const toAspect = (ratio) => ratio.replace(':', ' / ');

/**
 * A visual slot in a case study. Without `src` it renders a labelled placeholder
 * that reserves the final aspect ratio; pass `src` later to drop the real image in
 * without any layout shift. Search the code for `data-placeholder` to find them all.
 */
export const CasePlaceholder = ({ label, ratio = '16:9', note = 'Replace with final project visual', kind = 'Image placeholder', src, alt = '', fit = 'cover', size }) => (
  <div
    className={`case-visual ${size ? `case-visual--${size}` : ''} ${src ? 'case-visual--image' : ''}`}
    style={{ aspectRatio: toAspect(ratio) }}
    {...(src ? {} : { 'data-placeholder': label })}
  >
    {src ? (
      <img src={src} alt={alt} loading="lazy" style={{ objectFit: fit }} />
    ) : (
      <div className="case-visual__placeholder" aria-hidden="true">
        <span className="case-visual__kind">[ {kind} ]</span>
        <span className="case-visual__label">{label}</span>
        <span className="case-visual__ratio">{ratio}</span>
        <span className="case-visual__note">{note}</span>
      </div>
    )}
  </div>
);

export default CasePlaceholder;
