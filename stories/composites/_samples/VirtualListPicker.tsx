/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { MARQUEE_KEY_ATTRIBUTE, MarqueeBox, VirtualList, useMarqueeSelect } from '../../../src/composites';
import type { VirtualListHandle } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { entriesOf } from './virtual-list-samples.constants';
import type { LogEntry } from './virtual-list-samples.constants';

interface VirtualListPickerProps {
  count: number;
  horizontal?: boolean;
}

const ITEM_SELECTOR = `[${MARQUEE_KEY_ATTRIBUTE}]`;

const renderEntry = (entry: LogEntry) => (
  <Box className="virtual-list-story__row">
    <Text>{entry.text}</Text>
  </Box>
);

const VirtualListPicker = (props: VirtualListPickerProps) => {
  const { count, horizontal = false } = props;
  const areaRef = useRef<HTMLElement>(null);
  const listRef = useRef<VirtualListHandle>(null);
  const items = useMemo(() => entriesOf(count), [count]);
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const marquee = useMarqueeSelect({
    containerRef: areaRef,
    itemSelector: ITEM_SELECTOR,
    selected: [...picked],
    onChange: (keys) => setPicked(new Set(keys)),
    canStart: () => true,
    getRects: () => listRef.current?.getRects() ?? [],
  });
  return (
    <ValueReadout value={`${picked.size} picked`}>
      <Box className={horizontal ? 'virtual-list-story virtual-list-story--strip' : 'virtual-list-story'}>
        <VirtualList
          ref={listRef}
          label="Events"
          orientation={horizontal ? 'horizontal' : 'vertical'}
          itemSize="size-96"
          items={items}
          getKey={(entry) => entry.id}
          getLabel={(entry) => entry.text}
          renderItem={renderEntry}
          selection={{ selected: picked, onChange: setPicked }}
          scrollRef={areaRef}
          bind={marquee.bind}
          overlay={<MarqueeBox rect={marquee.rect} />}
        />
      </Box>
    </ValueReadout>
  );
};

export { VirtualListPicker };
