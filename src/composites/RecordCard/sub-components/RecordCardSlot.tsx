/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { RecordCardSlotProps } from './RecordCardSlot.type';

const RecordCardSlot = ({ when = true, main = false, children }: RecordCardSlotProps) => {
  if (!when) return null;
  return <Box className={main ? 'record-card__slot record-card__slot--main' : 'record-card__slot'}>{children}</Box>;
};

export { RecordCardSlot };
