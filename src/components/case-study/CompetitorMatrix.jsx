import React from 'react';
import { BENCHMARK, COMPETITORS, STATUS } from './ztBenchmark';

/**
 * A text-first competitor matrix. Every cell carries a written status (never colour or
 * shape alone) plus the evidence from the audit. Scrolls sideways on small screens with
 * the capability column pinned.
 */
export const CompetitorMatrix = ({ competitors = COMPETITORS, data = BENCHMARK, caption }) => (
  <div className="cm">
    <ul className="cm-legend" aria-label="Status key">
      {Object.entries(STATUS).map(([key, { label, mark }]) => (
        <li key={key} className={`cm-status cm-status--${key}`}>
          <span aria-hidden="true">{mark}</span>{label}
        </li>
      ))}
      <li className="cm-legend__note">“Not documented” means it wasn’t recorded in my audit — not that the platform lacks it.</li>
    </ul>

    <div className="cm-scroll" tabIndex={0} role="region" aria-label="Competitor benchmark table, scrolls horizontally">
      <table className="cm-table">
        {caption && <caption className="visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            <th scope="col" className="cm-feature">Capability</th>
            {competitors.map((name) => <th key={name} scope="col">{name}</th>)}
          </tr>
        </thead>
        {data.map(({ group, rows }, gi) => (
          <tbody key={group}>
            <tr className="cm-group">
              <th scope="colgroup" colSpan={competitors.length + 1}>
                <span className="cm-group__label"><span>{String.fromCharCode(65 + gi)}</span>{group}</span>
              </th>
            </tr>
            {rows.map(([feature, cells]) => (
              <tr key={feature}>
                <th scope="row" className="cm-feature">{feature}</th>
                {cells.map((cell, i) => {
                  const { label, mark } = STATUS[cell.s];
                  return (
                    <td key={competitors[i]} className={`cm-cell cm-cell--${cell.s}`}>
                      <span className={`cm-status cm-status--${cell.s}`}><span aria-hidden="true">{mark}</span>{label}</span>
                      {cell.note && <span className="cm-note">{cell.note}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  </div>
);

export default CompetitorMatrix;
