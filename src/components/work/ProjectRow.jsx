import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const pad = (value) => String(value).padStart(2, '0');

/**
 * One line of the project index: number, name, disciplines, year. On hover the row
 * floods white and the name widens and slides. The inline preview is used on touch
 * screens and in the case-study "next project" row.
 */
export const ProjectRow = ({ project, index, onOpen }) => (
  <li className="index-row-item">
    <button
      type="button"
      className="index-row"
      data-cursor="card"
      onClick={() => onOpen?.(project)}
      aria-label={`${project.title} — view case study`}
    >
      <span className="index-row__num">{pad(index + 1)}</span>
      <span className="index-row__name">
        <span className="index-row__name-text">{project.title}</span>
      </span>
      <span className="index-row__meta">
        <span className="index-row__disciplines">{project.disciplines ?? project.tags?.join(' · ')}</span>
        <span className="index-row__summary">{project.summary ?? project.description}</span>
      </span>
      <span className="index-row__year">{project.year}</span>
      <ArrowUpRight className="index-row__arrow" size={26} strokeWidth={1.5} aria-hidden="true" />

      {project.image && (
        <span className="index-row__preview" aria-hidden="true">
          <img
            src={project.image}
            alt=""
            loading="lazy"
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          />
        </span>
      )}
    </button>
  </li>
);

export default ProjectRow;
