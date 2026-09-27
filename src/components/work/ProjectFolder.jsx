import React from 'react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { FolderTab } from './FolderTab';

export const ProjectFolder = ({ project, onOpen, index = 0 }) => {
  const isLocked = project.status === 'locked';

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
      className={`project-folder project-folder--paper-${(index % 5) + 1} ${isLocked ? 'project-folder--locked' : ''}`}
      role={isLocked ? undefined : 'button'}
      tabIndex={isLocked ? undefined : 0}
      aria-label={isLocked ? `${project.title} — Coming soon` : `View ${project.title} case study`}
      onClick={openProject}
      onKeyDown={handleKeyDown}
    >
      <FolderTab index={index} category={project.category} title={project.tabLabel ?? project.title} />

      <span className="project-folder__edge-code" aria-hidden="true">
        FILE_{String(index + 1).padStart(2, '0')} / {String(index + 1).padStart(2, '0')}—{String(5).padStart(2, '0')}
      </span>

      <div className="project-folder__content">
        <div className="project-folder__visual" aria-label={`${project.title} image placeholder`}>
          <div className="project-folder__placeholder-grid" aria-hidden="true" />
          <span className="project-folder__placeholder-coordinate" aria-hidden="true">
            VISUAL STUDY / {String(index + 1).padStart(2, '0')}A
          </span>
          <span className="project-folder__placeholder-number" aria-hidden="true">
            {String(project.id).padStart(2, '0')}
          </span>
          <span className="project-folder__placeholder-label">
            IMAGE_{String(index + 1).padStart(3, '0')} / VISUAL PLACEHOLDER
          </span>
        </div>

        <div className="project-folder__copy">
          <div className="project-folder__identity">
            <div className="project-folder__meta-row">
              <span className="metadata-label">{project.number}</span>
              <span className="metadata-label metadata-label--accent">{project.category}</span>
              {project.year && <span className="metadata-label">{project.year}</span>}
            </div>
            <h3 className="project-folder__title">{project.title}</h3>
            <p className="project-folder__description">{project.description}</p>
          </div>

          <div className="project-folder__footer">
            <div className="project-folder__supporting">
              {project.role && (
                <p className="project-folder__role">
                  <span>Role</span>
                  {project.role}
                </p>
              )}
              <div className="project-folder__tags" aria-label="Project disciplines">
                {project.tags?.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <span className="project-folder__action" aria-hidden="true">
              {isLocked ? <Lock size={15} /> : <ArrowUpRight size={17} />}
              {isLocked ? 'Coming soon' : 'Open case study'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectFolder;
