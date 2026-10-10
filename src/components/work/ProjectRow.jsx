import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';

const pad = (value) => String(value).padStart(2, '0');

/**
 * One line of the project index: number, name, disciplines. On hover the row
 * floods white and the name widens and slides. The inline preview is used on touch
 * screens and in the case-study "next project" row. Locked projects can't be opened;
 * on hover their name gives way to "Coming soon".
 */
export const ProjectRow = ({ project, index, onOpen }) => {
  const locked = project.status === 'locked';
  return (
  <li className={`index-row-item ${locked ? 'is-locked' : ''}`}>
    <button
      type="button"
      className="index-row"
      data-cursor="card"
      onClick={() => { if (!locked) onOpen?.(project); }}
      aria-disabled={locked || undefined}
      aria-label={locked ? `${project.title} — case study coming soon` : `${project.title} — view case study`}
    >
      <span className="index-row__num">{pad(index + 1)}</span>
      <span className="index-row__name">
        <span className="index-row__name-text">{project.title}</span>
        {locked && (
          <span className="index-row__soon" aria-hidden="true">
            <Lock className="index-row__lock" strokeWidth={1.75} />
            Coming soon
          </span>
        )}
      </span>
      <span className="index-row__meta">
        <span className="index-row__disciplines">{project.disciplines ?? project.tags?.join(' · ')}</span>
        <span className="index-row__summary">{project.summary ?? project.description}</span>
      </span>
      {locked
        ? <Lock className="index-row__arrow" size={22} strokeWidth={1.5} aria-hidden="true" />
        : <ArrowUpRight className="index-row__arrow" size={26} strokeWidth={1.5} aria-hidden="true" />}

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
};

export default ProjectRow;
