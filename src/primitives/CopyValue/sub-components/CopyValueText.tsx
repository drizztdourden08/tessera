/* @layer renderer-components @kind component */
import { MIDDLE_TAIL } from '../CopyValue.constants';
import type { CopyValueTextProps } from '../CopyValue.type';

const CopyValueText = (props: CopyValueTextProps) => {
  const { value, truncate } = props;
  if (truncate !== 'middle' || value.length <= MIDDLE_TAIL * 2) {
    return <span className="copy-value__text" title={truncate ? value : undefined}>{value}</span>;
  }
  return (
    <span className="copy-value__text" title={value}>
      <span className="visually-hidden">{value}</span>
      <span className="copy-value__head" aria-hidden>{value.slice(0, -MIDDLE_TAIL)}</span>
      <span className="copy-value__tail" aria-hidden>{value.slice(-MIDDLE_TAIL)}</span>
    </span>
  );
};

export { CopyValueText };
