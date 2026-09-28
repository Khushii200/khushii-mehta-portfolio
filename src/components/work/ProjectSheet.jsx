import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';

const pad = (value, length = 2) => String(value).padStart(length, '0');

/**
 * A project laid out as a sheet of paper: metadata, title, copy and CTA on the
 * left, a rounded visual frame on the right, plus a few handwritten margin notes.
 */
export const ProjectSheet = ({ project, onOpen, index = 0, total = 5 }) => {
  const isLocked = project.status === 'locked';
  const processNote = project.processNote ?? project.tags?.slice(0, 2).map((tag) => tag.toLowerCase()).join(' → ');

  const openProject = () => {
    if (!isLocked) onOpen?.(project);
  };

  const handleKeyDown = (event) => {
    if (!isLocked && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openProject();
    }
  };

  return (
    <article
      className={`project-sheet project-sheet--${(index % 5) + 1} project-sheet--theme-${project.theme ?? 'sand'} ${isLocked ? 'project-sheet--locked' : ''}`}
      role={isLocked ? undefined : 'button'}
      tabIndex={isLocked ? undefined : 0}
      aria-label={isLocked ? `${project.title} — Coming soon` : `View ${project.title} case study`}
      onClick={openProject}
      onKeyDown={handleKeyDown}
    >
      <div className="project-sheet__content">
        <div className="project-sheet__copy">
          <p className="project-sheet__meta">
            <span>{pad(index + 1)}</span>
            <span aria-hidden="true">/</span>
            <span>{project.category}</span>
            {project.year && (
              <>
                <span aria-hidden="true">/</span>
                <span>{project.year}</span>
              </>
            )}
          </p>

          <h3 className="project-sheet__title">{project.title}</h3>
          <p className="project-sheet__description">{project.description}</p>

          {project.role && (
            <p className="project-sheet__role">
              <span>Role</span>
              {project.role}
            </p>
          )}

          <div className="project-sheet__tags" aria-label="Project disciplines">
            {project.tags?.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <span className="project-sheet__action" aria-hidden="true">
            {isLocked ? 'Coming soon' : 'Open case study'}
            <span className="project-sheet__action-icon">
              {isLocked ? <Lock size={14} /> : <ArrowUpRight size={16} />}
            </span>
          </span>
        </div>

        <div
          className={`project-sheet__visual ${project.image ? 'project-sheet__visual--image' : ''} ${
            project.imageFit === 'cover' ? 'project-sheet__visual--cover' : ''
          }`}
        >
          {project.image ? (
            <img
              className="project-sheet__image"
              src={project.image}
              alt={`${project.title} project visual`}
              loading="lazy"
              style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
            />
          ) : (
            <>
              <div className="project-sheet__visual-grid" aria-hidden="true" />
              <span className="project-sheet__visual-number" aria-hidden="true">{pad(index + 1)}</span>
            </>
          )}
          <span className="project-sheet__note project-sheet__note--visual" aria-hidden="true">
            visual study / {pad(index + 1)}
          </span>
          {processNote && (
            <span className="project-sheet__note project-sheet__note--process" aria-hidden="true">
              {processNote}
            </span>
          )}
        </div>
      </div>

      <span className="project-sheet__note project-sheet__note--count" aria-hidden="true">
        {pad(index + 1)} / {pad(total)}
      </span>

      {/* darkens the sheet slightly as it recedes behind the next one */}
      <div className="project-sheet__shade" aria-hidden="true" />
    </article>
  );
};

export default ProjectSheet;
