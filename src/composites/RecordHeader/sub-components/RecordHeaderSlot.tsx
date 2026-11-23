/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { recordHeaderSlotClass } from '../behavior/record-header-slot-class';
import type { RecordHeaderSlotProps } from './RecordHeaderSlot.type';

const RecordHeaderSlot = (props: RecordHeaderSlotProps) => {
  if (props.when === false) return null;
  return <Box className={recordHeaderSlotClass(props)}>{props.children}</Box>;
};

export { RecordHeaderSlot };
