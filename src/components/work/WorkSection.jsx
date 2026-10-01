import React from 'react';
import { ProjectRow } from './ProjectRow';

const pad = (value) => String(value).padStart(2, '0');

/**
 * Selected work as a quiet black-and-white archive: one row per project,
 * opening on hover to reveal the project image.
 */
export const WorkSection = ({ projects, onOpenProject }) => (
  <section id="work" className="portfolio-section work-section" aria-labelledby="work-title">
    <div className="site-container archive">
      <header className="archive__head">
        <p className="archive__label">01 / Work</p>
        <h2 id="work-title" className="archive__title">Selected work</h2>
        <p className="archive__intro">projects that became things.</p>
        <p className="archive__count" aria-hidden="true">({pad(projects.length)})</p>
      </header>

      <ol className="archive__list">
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} onOpen={onOpenProject} />
        ))}
      </ol>
    </div>
  </section>
);

export default WorkSection;
