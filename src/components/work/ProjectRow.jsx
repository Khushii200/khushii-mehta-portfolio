import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const pad = (value) => String(value).padStart(2, '0');

/**
 * One line of the project archive: number, name, disciplines and a one-line
 * description. On hover / keyboard focus the row opens and the project image
 * wipes in on the right; on touch screens the image is simply shown.
 */
export const ProjectRow = ({ project, index, onOpen }) => (
  <li className="archive-row-item">
    <button
      type="button"
      className="archive-row"
      data-cursor="card"
      onClick={() => onOpen?.(project)}
      aria-label={`${project.title} — view case study`}
    >
      <span className="archive-row__num">{pad(index + 1)}</span>

      <span className="archive-row__text">
        <span className="archive-row__name">{project.title}</span>
        <span className="archive-row__disciplines">{project.disciplines ?? project.tags?.join(' · ')}</span>
        <span className="archive-row__summary">{project.summary ?? project.description}</span>
      </span>

      {project.image && (
        <span className="archive-row__preview" data-cursor="image" aria-hidden="true">
          <img
            src={project.image}
            alt=""
            loading="lazy"
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          />
        </span>
      )}

      <ArrowUpRight className="archive-row__arrow" size={22} strokeWidth={1.75} aria-hidden="true" />
    </button>
  </li>
);

export default ProjectRow;
