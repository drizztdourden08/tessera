/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Status } from '../../primitives/Status';
import { Tag } from '../../primitives/Tag';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ValueTagProps } from './ValueTag.type';
import './ValueTag.css';

const ValueTag = (props: ValueTagProps) => {
  const { value, label, compact = false, className } = props;
  const { options } = useTesseraStrings();
  const words = value ? options.valueTrue : options.valueFalse;
  return (
    <Box as="span" className={['value-tag', className].filter(Boolean).join(' ')} data-compact={compact || undefined}>
      {label !== undefined && <Text as="span" className="value-tag__label">{label}</Text>}
      {typeof value === 'boolean'
        ? <Status tone={value ? 'success' : 'neutral'} variant="pill" dot>{words}</Status>
        : <Tag>{String(value)}</Tag>}
    </Box>
  );
};

export { ValueTag };
