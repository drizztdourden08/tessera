/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { MIDDLE_TAIL } from '../CopyValue.constants';
import type { CopyValueTextProps } from '../CopyValue.type';

const CopyValueText = (props: CopyValueTextProps) => {
  const { value, truncate } = props;
  if (truncate !== 'middle' || value.length <= MIDDLE_TAIL * 2) {
    return <Box as="span" className="copy-value__text" title={truncate ? value : undefined}>{value}</Box>;
  }
  return (
    <Box as="span" className="copy-value__text" title={value}>
      <Box as="span" className="visually-hidden">{value}</Box>
      <Box as="span" className="copy-value__head" aria-hidden>{value.slice(0, -MIDDLE_TAIL)}</Box>
      <Box as="span" className="copy-value__tail" aria-hidden>{value.slice(-MIDDLE_TAIL)}</Box>
    </Box>
  );
};

export { CopyValueText };
