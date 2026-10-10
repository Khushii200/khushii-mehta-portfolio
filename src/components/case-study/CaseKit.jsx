import React, { useEffect, useRef } from 'react';
import { Maximize2, X } from 'lucide-react';

/*
 * Shared building blocks for the artefact-led case studies (ZipTrrip, SolarLink).
 * Styles live under .zt-* in index.css.
 */

export const Section = ({ id, number, label, title, intro, tone, children }) => (
  <section id={id} className={`zt-section ${tone ? `zt-section--${tone}` : ''}`} aria-labelledby={`${id}-title`}>
    <div className="zt-wrap">
      <header className="zt-head">
        <p className="zt-kicker"><span>{number}</span>{label}</p>
        <h2 id={`${id}-title`} className="zt-h2">{title}</h2>
        {intro && <p className="zt-intro">{intro}</p>}
      </header>
      {children}
    </div>
  </section>
);

/** A real project artefact. Click to open it full size. */
export const Figure = ({ src, alt, caption, source, onZoom, className = '', framed = true }) => (
  <figure className={`zt-figure ${className}`}>
    <button
      type="button"
      className={`zt-figure__frame ${framed ? '' : 'zt-figure__frame--bare'}`}
      onClick={() => onZoom({ src, alt, caption })}
      aria-label={`Enlarge image: ${alt}`}
    >
      <img src={src} alt={alt} loading="lazy" />
      <span className="zt-figure__zoom" aria-hidden="true"><Maximize2 size={14} strokeWidth={2} /></span>
    </button>
    {(caption || source) && (
      <figcaption>
        {source && <span className="zt-figure__source">{source}</span>}
        {caption}
      </figcaption>
    )}
  </figure>
);

export const Lightbox = ({ image, onClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);
  return (
    <dialog
      ref={ref}
      className="zt-lightbox"
      aria-label={image?.alt || 'Image'}
      onClose={onClose}
      onClick={(event) => { if (event.target === ref.current) onClose(); }}
    >
      {image && (
        <>
          <button type="button" className="zt-lightbox__close" onClick={onClose} aria-label="Close image">
            <X size={20} />
          </button>
          <div className="zt-lightbox__scroll">
            <img src={image.src} alt={image.alt} />
          </div>
          {image.caption && <p className="zt-lightbox__caption">{image.caption}</p>}
        </>
      )}
    </dialog>
  );
};
