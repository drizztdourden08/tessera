/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { DropSlotClear } from './DropSlotClear';
import type { DropSlotBodyProps } from './DropSlotBody.type';

const DropSlotBody = ({ holds, label, clearLabel, disabled, children, onClear }: DropSlotBodyProps) => {
  if (!holds) return <Text variant="caption" tone="faint" className="drop-slot__label">{label}</Text>;
  return (
    <>
      <Box className="drop-slot__content">{children}</Box>
      {onClear && <DropSlotClear label={clearLabel} disabled={disabled} onClear={onClear} />}
    </>
  );
};

export { DropSlotBody };
