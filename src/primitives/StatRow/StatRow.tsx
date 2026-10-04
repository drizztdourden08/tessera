/* @layer renderer-components @kind component */
import './StatRow.css';
import { CopyButton } from '../CopyButton';
import { Span } from '../text-elements';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { copyText } from './behavior/copy-text';
import type { StatRowProps } from './StatRow.type';

const StatRow = (props: StatRowProps) => {
  const { label, value, mono, copyable, className = '' } = props;
  const { common } = useTesseraStrings();
  const text = copyText(value, copyable);
  return (
    <div className={`stat-row${className ? ` ${className}` : ''}`}>
      <Span tone="muted" className="stat-row__label">{label}</Span>
      <Span className="stat-row__value" data-mono={mono ? '' : undefined}>{value}</Span>
      {text !== undefined && (
        <CopyButton text={text} label={common.copyNamed(typeof label === 'string' ? label : '')} size="xs" className="stat-row__copy" />
      )}
    </div>
  );
};

export { StatRow };
