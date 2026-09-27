import React from 'react';
import { ProjectFolder } from './ProjectFolder';

/**
 * Full-bleed project archive. Each file becomes sticky in sequence so the
 * following project rises over it while the earlier folder remains visible.
 */
export const WorkSection = ({
  projects,
  onOpenProject,
  setHovering,
  setCursorLabel,
  setCursorStatus,
}) => {
  const handleEnter = (project) => {
    setHovering(true);
    setCursorLabel(project.status === 'locked' ? 'Coming Soon' : 'View Case Study');
    setCursorStatus(project.status);
  };

  const handleLeave = () => {
    setHovering(false);
    setCursorLabel('');
    setCursorStatus('default');
  };

  return (
    <section id="work" className="portfolio-section work-section" aria-label="Selected work">
      <header className="project-archive__index">
        <div>
          <p>Selected work / Visual studies</p>
          <h2>Project archive_01—05</h2>
        </div>
        <p>Strategy · Experience · Technology</p>
        <span>Open files ↓</span>
      </header>

      <div className="project-folder-stack">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-folder-step"
              style={{
                '--folder-index': index,
                zIndex: index + 1,
              }}
              onMouseEnter={() => handleEnter(project)}
              onMouseLeave={handleLeave}
            >
              <ProjectFolder project={project} index={index} onOpen={onOpenProject} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default WorkSection;
