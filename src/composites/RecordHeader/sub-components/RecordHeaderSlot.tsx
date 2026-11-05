/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { RecordHeaderSlotProps } from './RecordHeaderSlot.type';

const RecordHeaderSlot = ({ when = true, main = false, children }: RecordHeaderSlotProps) => {
  if (!when) return null;
  return <Box className={main ? 'record-header__slot record-header__slot--main' : 'record-header__slot'}>{children}</Box>;
};

export { RecordHeaderSlot };
