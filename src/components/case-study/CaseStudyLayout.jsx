import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Shared building blocks for the case-study system (see BsnlCaseStudy for the
 * reference page). Everything sits on the 12-column `.case-grid`; `col` is the
 * desktop placement, and tablet/phone stack unless `md` is given.
 */

export const pad = (n) => String(n).padStart(2, '0');

export const Col = ({ col, md, className = '', children }) => (
  <div className={`case-col ${className}`} style={{ '--col': col, ...(md ? { '--col-md': md } : {}) }}>
    {children}
  </div>
);

export const Chapter = ({ id, number, title, children, tone, className = '' }) => (
  <section id={id} className={`case-chapter ${tone ? `case-chapter--${tone}` : ''} ${className}`} aria-labelledby={`${id}-title`}>
    <div className="case-grid case-chapter__head">
      <Col col="1 / span 6">
        <p className="case-meta"><span className="case-meta__num">{pad(number)}</span> / {title}</p>
      </Col>
    </div>
    {children}
  </section>
);

export const Caption = ({ index, title, children }) => (
  <p className="case-caption">
    <span className="case-meta">{pad(index)} / {title}</span>
    {children}
  </p>
);

export const NumberedList = ({ items, className = '' }) => (
  <ol className={`case-points ${className}`}>
    {items.map(([title, body], index) => (
      <li key={title}>
        <span className="case-points__num">{pad(index + 1)}</span>
        <h3 className="case-sub">{title}</h3>
        {body && <p className="case-body">{body}</p>}
      </li>
    ))}
  </ol>
);

/** A chain of steps joined by arrows. `layout="row"` wraps horizontally; "column" stacks. */
export const Flow = ({ items, layout = 'row', label, className = '' }) => (
  <ol className={`case-flow case-flow--${layout} ${className}`} aria-label={label}>
    {items.map((item, index) => (
      <li key={`${index}-${typeof item === 'string' ? item : ''}`} className="case-flow__step">
        <span className="case-flow__item">{item}</span>
        {index < items.length - 1 && <ArrowRight className="case-flow__arrow" size={16} aria-hidden="true" />}
      </li>
    ))}
  </ol>
);

export const Chips = ({ items, label, className = '' }) => (
  <ul className={`case-chips ${className}`} aria-label={label}>
    {items.map((item) => <li key={item}>{item}</li>)}
  </ul>
);

/** Titled columns of short lists (roles, deliverables…). */
export const ListColumns = ({ columns }) => (
  <div className="case-columns">
    {columns.map(([title, items]) => (
      <div key={title}>
        <h3 className="case-sub">{title}</h3>
        <ul>
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    ))}
  </div>
);

/** Before → after pair. */
export const FromTo = ({ from, to, fromLabel = 'From', toLabel = 'To', size }) => (
  <div className={`case-fromto ${size ? `case-fromto--${size}` : ''}`}>
    <div>
      <p className="case-meta">{fromLabel}</p>
      <p className="case-fromto__text">{from}</p>
    </div>
    <ArrowRight className="case-fromto__arrow" size={28} aria-hidden="true" />
    <div className="case-fromto__to">
      <p className="case-meta">{toLabel}</p>
      <p className="case-fromto__text">{to}</p>
    </div>
  </div>
);
