/* @layer stories @kind component */
import { useState } from 'react';
import { VirtualList } from '../../../src/composites';
import { Box, ScrollArea, Text } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { moveEntries } from './move-entries';
import { entriesOf } from './virtual-list-samples.constants';
import type { LogEntry } from './virtual-list-samples.constants';

const START_AT = 3;

const renderEntry = (entry: LogEntry) => (
  <Box className="virtual-list-story__row">
    <Text>{entry.text}</Text>
  </Box>
);

const VirtualListOuter = () => {
  const [entries, setEntries] = useState(() => entriesOf(2000));
  const [note, setNote] = useState('nothing picked');
  return (
    <ValueReadout value={`${note}; the tab stop starts on Event ${START_AT + 1}`}>
      <ScrollArea axis="x" className="virtual-list-story virtual-list-story--strip">
        <VirtualList
          label="Events"
          orientation="horizontal"
          itemSize="size-96"
          items={entries}
          getKey={(entry) => entry.id}
          renderItem={renderEntry}
          scrollParent="auto"
          initialFocusIndex={START_AT}
          onPick={(index) => setNote(`picked Event ${index + 1}`)}
          reorder={{ onMove: (move) => setEntries((now) => moveEntries(now, move.keys, move.to)) }}
        />
      </ScrollArea>
    </ValueReadout>
  );
};

export { VirtualListOuter };
