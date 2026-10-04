import React from 'react';
import { ProjectRow } from './ProjectRow';

const pad = (value) => String(value).padStart(2, '0');

/** Selected work as a typographic index. */
export const WorkSection = ({ projects, onOpenProject }) => (
  <section id="work" className="portfolio-section work" aria-labelledby="work-title">
    <div className="site-container">
      <header className="work__head">
        <p className="kicker"><span>01</span> Work</p>
        <h2 id="work-title" className="work__title">
          <span className="work__title-a">Selected</span>
          <span className="work__title-b">work<sup className="work__count">({pad(projects.length)})</sup></span>
        </h2>
        <p className="work__intro">
          <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M6 6 L 34 34 M 34 14 L 34 34 L 14 34" /></svg>
          projects that became things.
        </p>
      </header>

      <ol className="index-list">
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} onOpen={onOpenProject} />
        ))}
      </ol>
    </div>
  </section>
);

export default WorkSection;
