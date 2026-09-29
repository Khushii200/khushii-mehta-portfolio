import React, { useEffect, useRef } from 'react';
import { ProjectSheet } from './ProjectSheet';
import { Scribbled, SectionLabel } from '../ui/Scribble';

// Scroll-driven stack is only used where there is room for it; phones get a plain list.
const SHOWCASE_QUERY = '(min-width: 768px) and (min-height: 560px)';
const clamp01 = (value) => Math.min(1, Math.max(0, value));

/**
 * Selected work: each project is a paper sheet that sticks in the centre of the
 * viewport. As the next sheet rises into focus, the current one tilts back
 * slightly and recedes. Everything is driven by native scroll (no scroll-jacking)
 * and only CSS variables for transform/opacity are written per frame.
 */
export const WorkSection = ({ projects, onOpenProject }) => {
  const showcaseRef = useRef(null);
  const slideRefs = useRef([]);

  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) return;

    const media = window.matchMedia(SHOWCASE_QUERY);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = null;

    const update = () => {
      frame = null;
      const slides = slideRefs.current.filter(Boolean);
      const stickTop = parseFloat(getComputedStyle(slides[0]).top) || 0;
      const range = window.innerHeight * 0.85;
      let activeIndex = 0;

      slides.forEach((slide, index) => {
        // 0 while the sheet is a full range below its resting spot, 1 once it has arrived
        const enter = clamp01(1 - (slide.getBoundingClientRect().top - stickTop) / range);
        const next = slides[index + 1];
        const recede = next ? clamp01(1 - (next.getBoundingClientRect().top - stickTop) / range) : 0;

        slide.style.setProperty('--enter', enter.toFixed(3));
        slide.style.setProperty('--recede', recede.toFixed(3));
        if (enter > 0.9) activeIndex = index;
      });

      slides.forEach((slide, index) => slide.classList.toggle('is-active', index === activeIndex));
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const setMode = () => {
      const enhanced = media.matches && !reducedMotion.matches;
      showcase.classList.toggle('is-enhanced', enhanced);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);

      if (enhanced) {
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);
        update();
      } else {
        slideRefs.current.forEach((slide) => {
          slide?.style.removeProperty('--enter');
          slide?.style.removeProperty('--recede');
          slide?.classList.remove('is-active');
        });
      }
    };

    setMode();
    media.addEventListener('change', setMode);
    reducedMotion.addEventListener('change', setMode);

    return () => {
      media.removeEventListener('change', setMode);
      reducedMotion.removeEventListener('change', setMode);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [projects.length]);

  return (
    <section id="work" className="portfolio-section work-section" aria-labelledby="work-title">
      <header className="work-intro">
        <SectionLabel number={1}>Work</SectionLabel>
        <h2 id="work-title">Selected <Scribbled>work</Scribbled></h2>
        <p>projects that became things.</p>
      </header>

      <div ref={showcaseRef} className="work-showcase">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(node) => { slideRefs.current[index] = node; }}
            className="work-slide"
            style={{ zIndex: index + 1 }}
          >
            <ProjectSheet project={project} index={index} total={projects.length} onOpen={onOpenProject} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
