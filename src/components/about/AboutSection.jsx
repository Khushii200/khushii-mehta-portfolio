import React from 'react';
import illustration from '../../assets/about-khushii-illustration.png';

const NOTES = [
  ['studying', 'Experience Design × Marketing, FLAME University'],
  ['into', 'UX · service design · systems thinking · physical prototyping'],
  ['making with', 'Figma · Framer · React · Arduino · Blender'],
  ['based in', 'Mumbai / Pune'],
];

// Pixel dinosaur on a 20×18 grid ("#" = filled)
const DINO = [
  '..........########..',
  '.........##.#######.',
  '.........##########.',
  '.........##########.',
  '.........#####......',
  '.........########...',
  '#.......#####.......',
  '#......#######......',
  '##...##########.....',
  '###..#########.#....',
  '############........',
  '.##########.........',
  '..########..........',
  '...######...........',
  '....###.##..........',
  '....##...#..........',
  '....#....#..........',
  '....##...##.........',
];

/**
 * About, as a page from a sketchbook: the character on dot-grid paper with a
 * few black-and-white sticker notes, and a short, quiet introduction.
 */
export const AboutSection = () => (
  <section id="about" className="portfolio-section about-section desk">
    <div className="site-container desk__inner">
      {/* LEFT — the sketchbook page */}
      <div className="desk__page">
        <span className="desk__tape desk__tape--left" aria-hidden="true" />
        <span className="desk__tape desk__tape--right" aria-hidden="true" />

        {/* loose ink circle drawn behind the character */}
        <svg className="desk__circle" viewBox="0 0 200 200" aria-hidden="true">
          <path d="M100 14c47 1 84 37 84 85 0 49-38 87-86 86-46-1-82-38-82-85 0-45 34-82 80-86 12-1 25 1 35 5" />
        </svg>

        <img className="desk__character" src={illustration} alt="Illustrated portrait of Khushii Mehta" />

        {/* personal notes stuck around the drawing */}
        <div className="desk__notes" aria-hidden="true">
          <div className="note note--poster">
            <span>Sleep.</span>
            <span>Design.</span>
            <span>Repeat.</span>
          </div>

          <div className="note note--friendly">
            <svg viewBox="0 0 196 118">
              <rect x="10" y="12" width="130" height="86" rx="12" />
              <path d="M36 30c7-6 16-7 24-2M76 26c8-5 17-5 24 1" />
              <circle cx="52" cy="50" r="12" />
              <circle cx="90" cy="47" r="12" />
              <circle cx="56" cy="52" r="4.5" className="fill" />
              <circle cx="94" cy="49" r="4.5" className="fill" />
              <path d="M48 72c12 13 32 14 46 0" />
              <path d="M118 86 126 50l10 12 34-34 10 10-34 34 12 10Z" className="paper" />
              <path d="M106 80l-9-4M108 94l-9 4M116 101l1 9" />
            </svg>
            <span>User Friendly</span>
          </div>

          <span className="note note--tag note--creative">creative</span>
          <span className="note note--tag note--curious">curious</span>
          <span className="note note--tag note--ambitious">ambitious</span>

          <svg className="desk__arrow" viewBox="0 0 90 60">
            <path d="M6 10c18 2 42 10 56 30" />
            <path d="M50 40l13 2 2-13" />
          </svg>

          <div className="desk__dino">
            <span className="desk__dino-speed" />
            <svg viewBox="0 0 20 18" shapeRendering="crispEdges">
              {DINO.flatMap((row, y) =>
                [...row].map((cell, x) => (cell === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null))
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* RIGHT — a short introduction */}
      <div className="desk__intro">
        <p className="desk__label">02 / About</p>
        <h2 className="desk__hello">Hi, I’m Khushii.</h2>

        <p className="desk__lead">
          I’m an Experience Design student exploring how research, strategy, technology and storytelling can create
          meaningful experiences.
        </p>
        <p className="desk__body">
          I’m majoring in Experience Design with a minor in Marketing, and I’m most drawn to UX, service design, systems
          thinking and physical prototyping — the places where an idea turns into something people can actually use.
        </p>

        <dl className="desk__list">
          {NOTES.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <p className="desk__signoff" aria-hidden="true">— khushii</p>
      </div>
    </div>
  </section>
);

export default AboutSection;
