/* @layer renderer-components @kind component */
import './StatRow.css';
import { Span } from '../text-elements';
import { copyText } from './behavior/copy-text';
import type { StatRowProps } from './StatRow.type';
import { StatRowCopy } from './sub-components/StatRowCopy';

const StatRow = (props: StatRowProps) => {
  const { label, value, mono, copyable, className = '' } = props;
  const text = copyText(value, copyable);
  return (
    <div className={`stat-row${className ? ` ${className}` : ''}`}>
      <Span tone="muted" className="stat-row__label">{label}</Span>
      <Span className="stat-row__value" data-mono={mono ? '' : undefined}>{value}</Span>
      {text !== undefined && <StatRowCopy text={text} name={typeof label === 'string' ? label : ''} />}
    </div>
  );
};

export { StatRow };
