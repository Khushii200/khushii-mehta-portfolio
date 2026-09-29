import React from 'react';
import illustration from '../../assets/about-khushii-illustration.png';
import { Scribbled, SectionLabel } from '../ui/Scribble';

const DETAILS = [
  ['Design', 'Experience Design · UX · Service Design · Visual Thinking'],
  ['Research', 'User Research · Behaviour · Strategy · Systems Thinking'],
  ['Making', 'Prototyping · Arduino · Sensors · Creative Technology'],
  ['Tools', 'Figma · Canva · Framer · React · Arduino · Blender · Filmora · AI Tools'],
  ['Education', 'FLAME University · Design + Marketing'],
  ['Based in', 'Mumbai / Pune'],
];

/* ---- sticker icons (hand-drawn feel, ink + coral only) ---- */
const Spark = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.5c.6 4.6 2.4 7.6 9.2 9.3-6.8 1.4-8.5 4.4-9.2 9.7-.9-5.2-2.9-8.2-9.4-9.6 6.6-1.6 8.7-4.6 9.4-9.4Z" />
  </svg>
);

const SKILLS = [
  ['Creative', 'coral', <Spark key="i" className="sticker__icon" />],
  ['Curious', 'cream', (
    <svg key="i" className="sticker__icon sticker__icon--line" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.2" /><path d="M15.2 15.4 20.5 20.6" />
    </svg>
  )],
  ['User first', 'ink', (
    <svg key="i" className="sticker__icon sticker__icon--line" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3.5 18.6 11l-6 1.6-2.6 5.8Z" /><path d="M14.5 15.5 19 20" />
    </svg>
  )],
  ['Systems thinking', 'tint', (
    <svg key="i" className="sticker__icon sticker__icon--line" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5" cy="6" r="2.4" /><circle cx="19" cy="6" r="2.4" /><circle cx="12" cy="18.5" r="2.4" />
      <path d="M7.3 6.4h9.4M6.4 8.1l4.4 8.4M17.6 8.1l-4.4 8.4" />
    </svg>
  )],
];

export const AboutSection = () => (
  <section id="about" className="portfolio-section about-section">
    <div className="site-container about-me">
      {/* LEFT — the character, with a few art-directed stickers around her */}
      <div className="about-stage">
        <img className="about-stage__character" src={illustration} alt="Illustrated portrait of Khushii Mehta" />

        {/* everything below is decorative personality */}
        <div className="about-stage__stickers" aria-hidden="true">
          <div className="sticker sticker--poster">
            <span>Sleep<i>.</i></span>
            <span>Design<i>.</i></span>
            <span>Repeat<i>.</i></span>
          </div>

          <ul className="about-stage__skills">
            {SKILLS.map(([label, tone, icon]) => (
              <li key={label} className={`sticker sticker--skill sticker--${tone}`}>
                {icon}
                {label}
              </li>
            ))}
          </ul>

          {/* doodles: one coral spark, one hand-drawn arrow */}
          <Spark className="about-doodle about-doodle--spark" />
          <svg className="about-doodle about-doodle--arrow" viewBox="0 0 90 60">
            <path d="M6 10c18 2 42 10 56 30" />
            <path d="M50 40l13 2 2-13" />
          </svg>

        </div>
      </div>

      {/* RIGHT — the content */}
      <div className="about-me__content">
        <header>
          <SectionLabel number={2}>About</SectionLabel>
          <h2>
            Get to <br />
            know <Scribbled>me.</Scribbled>
          </h2>
        </header>

        <div className="about-me__intro">
          <p>
            I’m Khushii Mehta, a multidisciplinary <mark className="hl">Experience Design</mark> student at FLAME University,
            majoring in Design with a minor in <mark className="hl">Marketing</mark>.
          </p>
          <p>
            I’m curious about people, behaviour and the systems around us. My practice sits at the intersection of research,
            strategy, storytelling and creative technology.
          </p>
          <p>
            I like turning observations into ideas that people can actually interact with, whether that means designing
            experiences, building prototypes, experimenting with Arduino and sensors, or figuring out how a system could work better.
          </p>
        </div>

        <dl className="about-me__details">
          {DETAILS.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);

export default AboutSection;
