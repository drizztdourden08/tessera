/* @layer renderer-components @kind component */
import './StatRow.css';
import { Span } from '../text-elements';
import type { StatRowProps } from './StatRow.type';

const StatRow = (props: StatRowProps) => {
  const { label, value, mono, className = '' } = props;
  return (
    <div className={`stat-row${className ? ` ${className}` : ''}`}>
      <Span tone="muted" className="stat-row__label">{label}</Span>
      <Span className="stat-row__value" data-mono={mono ? '' : undefined}>{value}</Span>
    </div>
  );
};

export { StatRow };
