/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Stack } from '../../../primitives/Stack';
import { Tag } from '../../../primitives/Tag';
import { Text } from '../../../primitives/Text';
import { Tooltip } from '../../../primitives/Tooltip';
import { SIGNAL_MORE_ATTRIBUTE } from '../SignalStrip.constants';
import type { SignalItem } from '../SignalStrip.type';

const SignalMore = ({ hidden }: { hidden: readonly SignalItem[] }) => {
  const list = (
    <Stack gap="2xs">
      {hidden.map((item) => <Text key={item.id} variant="caption">{item.label}</Text>)}
    </Stack>
  );

  return (
    <Box className="signal-strip__item" {...{ [SIGNAL_MORE_ATTRIBUTE]: '' }}>
      <Tooltip content={list} focusable>
        <Tag>{`+${String(hidden.length)}`}</Tag>
      </Tooltip>
    </Box>
  );
};

export { SignalMore };
