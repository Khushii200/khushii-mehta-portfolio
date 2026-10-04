import React, { useEffect, useRef, useState } from 'react';
import { MiniKhushii } from '../entrance/MiniKhushii';

const WORKING_ON = [
  'Experience Design',
  'UX Research',
  'Service Design',
  'Design Strategy',
  'Prototyping',
  'Physical Computing',
  'Visual Storytelling',
];

const CURRENTLY = ['4th year, Experience Design', 'FLAME University', 'Minor in Marketing', 'Based in Pune / Mumbai'];

const pad = (n) => String(n).padStart(2, '0');

/**
 * About — typographic and asymmetric: a split-weight greeting with Mini Khushii
 * standing on the rule beneath it, prose in offset columns, one pulled line, two indexes.
 */
export const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`portfolio-section about ${visible ? 'is-visible' : ''}`}
      aria-labelledby="about-title"
    >
      <div className="site-container about__grid">
        <p className="kicker about__kicker reveal"><span>02</span> About me</p>

        <h2 id="about-title" className="about__title">
          <span className="about__title-light reveal">Hi, I’m</span>
          <span className="about__title-bold reveal">Khushii.</span>
        </h2>

        <figure className="about__character reveal" role="img" aria-label="Mini Khushii, a 3D character of Khushii">
          <MiniKhushii width={260} height={420} lean={false} fit wave={visible && !reducedMotion} />
        </figure>
        <span className="about__rule" aria-hidden="true" />

        <p className="about__lead reveal">
          I’m an Experience Design student with a minor in Marketing, interested in understanding people, behaviours and
          the systems that shape everyday experiences.
        </p>

        <div className="about__body reveal">
          <p>
            My work moves between research, strategy, experience design and making. I like taking something I observe in
            the real world, understanding why it works the way it does, and figuring out how it could work better.
          </p>
          <p>
            Sometimes that means designing a digital experience. Sometimes it means mapping a service, building a physical
            prototype, experimenting with sensors, or simply asking better questions.
          </p>
        </div>

        <p className="about__pull reveal">
          I usually start with a question, make{' '}
          <span className="about__mess">
            a mess of ideas
            <svg viewBox="0 0 300 60" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M150 4 C 60 2, 6 14, 8 32 C 10 52, 120 58, 200 54 C 270 50, 298 38, 290 22 C 282 8, 220 2, 120 8" pathLength="1" />
            </svg>
          </span>
          , and slowly turn it into something useful.
        </p>

        <div className="about__index about__index--work reveal">
          <h3 className="about__subhead">What I like working on</h3>
          <ol>
            {WORKING_ON.map((item, index) => (
              <li key={item}><span>{pad(index + 1)}</span>{item}</li>
            ))}
          </ol>
        </div>

        <div className="about__index about__index--now reveal">
          <h3 className="about__subhead">Currently</h3>
          <ul>
            {CURRENTLY.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
