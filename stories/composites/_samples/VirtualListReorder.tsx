/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { VirtualList } from '../../../src/composites';
import type { VirtualListCellBind } from '../../../src/composites';
import { Box, Tag, Text } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { moveEntries } from './move-entries';
import { entriesOf } from './virtual-list-samples.constants';
import type { LogEntry } from './virtual-list-samples.constants';

const WARN_HEIGHT = 64;

const NORMAL_HEIGHT = 40;

const renderOption = (entry: LogEntry, _index: number, cell: VirtualListCellBind) => (
  <Box {...cell}>
    <Box className="virtual-list-story__row">
      <Text>{entry.text}</Text>
      {entry.level === 'warn' ? <Tag variant="urgency" color="warning">warn</Tag> : null}
    </Box>
  </Box>
);

const VirtualListReorder = () => {
  const [entries, setEntries] = useState(() => entriesOf(40));
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const [active, setActive] = useState(0);
  const order = useMemo(() => entries.map((entry) => entry.id).join('|'), [entries]);
  return (
    <ValueReadout value={`${picked.size} picked, drag a row, or press Alt with an arrow; the first place is closed`}>
      <Box className="virtual-list-story">
        <VirtualList
          label="Events"
          items={entries}
          getKey={(entry) => entry.id}
          getLabel={(entry) => entry.text}
          renderOption={renderOption}
          itemSize={(at) => (entries[at]?.level === 'warn' ? WARN_HEIGHT : NORMAL_HEIGHT)}
          itemSizeKey={order}
          endGutter={48}
          current={entries[active]?.id}
          onActiveChange={setActive}
          selection={{ selected: picked, onChange: setPicked }}
          reorder={{
            onMove: (move) => setEntries((now) => moveEntries(now, move.keys, move.to)),
            canDrop: (move) => move.to > 0,
            dropLabel: (position, modifier) => (modifier === 'alt' ? `Copy to ${position}` : `Move to ${position}`),
            renderThumbnail: (entry) => <Text>{entry.text}</Text>,
          }}
        />
      </Box>
    </ValueReadout>
  );
};

export { VirtualListReorder };
