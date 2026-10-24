/* @layer stories @kind component */
import { useMemo } from 'react';
import { VirtualList } from '../../../src/composites';
import type { VirtualListRowSize } from '../../../src/composites';
import { Box, Tag, Text } from '../../../src/primitives';
import { entriesOf } from './virtual-list-samples.constants';
import type { LogEntry } from './virtual-list-samples.constants';

interface VirtualListFrameProps {
  count: number;
  rowSize?: VirtualListRowSize;
  onActiveChange?: (index: number) => void;
}

const renderEntry = (entry: LogEntry) => (
  <Box className="virtual-list-story__row">
    <Text>{entry.text}</Text>
    {entry.level === 'warn' ? <Tag variant="urgency" color="warning">warn</Tag> : null}
  </Box>
);

const VirtualListFrame = (props: VirtualListFrameProps) => {
  const { count, rowSize, onActiveChange } = props;
  const items = useMemo(() => entriesOf(count), [count]);
  return (
    <Box className="virtual-list-story">
      <VirtualList label="Events" items={items} getKey={(entry) => entry.id} renderItem={renderEntry} rowSize={rowSize} onActiveChange={onActiveChange} />
    </Box>
  );
};

export { VirtualListFrame };
