import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { MiniKhushii } from './MiniKhushii';

export const LoadingExperience = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ['Designer', 'Researcher', 'Strategist', 'Maker', 'Storyteller', 'Experimenter'];

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [roles.length]);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="studio-shell">
      <header className="studio-nav">
        <div className="studio-nav__brand">
          Khushii <span>Mehta</span>
        </div>

        <div className="studio-nav__links">
          <a href="#work" onClick={(event) => scrollToSection(event, 'work')}>Work</a>
          <a href="#about" onClick={(event) => scrollToSection(event, 'about')}>About</a>
          <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>Contact</a>
          <div className="studio-nav__time">{time}</div>
        </div>
      </header>

      <main className="studio-stage" aria-labelledby="studio-title">
        <h1 id="studio-title" className="studio-stage__title">
          <span>Hi, I’m</span>
          <span className="studio-stage__dynamic-word" key={roles[roleIndex]}>{roles[roleIndex]}.</span>
        </h1>

        <section className="studio-stage__intro" aria-label="Introduction">
          <p>Experience Designer + Creative Technologist</p>
          <span>I design experiences, systems and interactions that make ideas feel more human.</span>
        </section>

        <div className="studio-character" aria-label="Mini Khushii">
          <MiniKhushii
            width={370}
            height={445}
            scale={0.62}
            animationName="Idle"
            enableMouseLook={false}
          />
        </div>

        <a className="studio-stage__action" href="#work" onClick={(event) => scrollToSection(event, 'work')}>
          Explore work <ArrowDown size={15} strokeWidth={2.4} />
        </a>
      </main>
    </div>
  );
};

export default LoadingExperience;
