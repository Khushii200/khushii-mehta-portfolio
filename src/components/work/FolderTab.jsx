import React from 'react';

export const FolderTab = ({ index, category, title }) => (
  <div className="folder-tab" aria-hidden="true">
    <span className="folder-tab__code">
      PROJECT_{String(index + 1).padStart(3, '0')} <span className="folder-tab__mark">//</span> {category}
    </span>
    <span className="folder-tab__title">{title}</span>
  </div>
);

export default FolderTab;
