/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { SIGNAL_KEY_ATTRIBUTE } from '../SignalStrip.constants';
import { chipKey } from '../behavior/chip-key';
import { SignalChip } from './SignalChip';
import type { SignalRunProps } from './SignalRun.type';

const SignalRun = ({ items }: SignalRunProps) => (
  <Box className="signal-strip__run">
    {items.map((item) => (
      <Box key={item.id} className="signal-strip__item" {...{ [SIGNAL_KEY_ATTRIBUTE]: chipKey(item) }}>
        <SignalChip item={item} />
      </Box>
    ))}
  </Box>
);

export { SignalRun };
