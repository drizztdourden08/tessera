/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { RecordHeaderSlotProps } from './RecordHeaderSlot.type';

const RecordHeaderSlot = ({ when = true, main = false, content = false, code = false, menu = false, children }: RecordHeaderSlotProps) => {
  if (!when) return null;
  const className = ['record-header__slot', main && 'record-header__slot--main', content && 'record-header__slot--content', code && 'record-header__slot--code', menu && 'record-header__slot--menu'].filter(Boolean).join(' ');
  return <Box className={className}>{children}</Box>;
};

export { RecordHeaderSlot };
