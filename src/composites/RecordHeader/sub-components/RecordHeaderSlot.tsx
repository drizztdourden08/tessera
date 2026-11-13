/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { RecordHeaderSlotProps } from './RecordHeaderSlot.type';

const RecordHeaderSlot = ({ when = true, main = false, content = false, children }: RecordHeaderSlotProps) => {
  if (!when) return null;
  const className = ['record-header__slot', main && 'record-header__slot--main', content && 'record-header__slot--content'].filter(Boolean).join(' ');
  return <Box className={className}>{children}</Box>;
};

export { RecordHeaderSlot };
