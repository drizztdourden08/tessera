/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { MARQUEE_KEY_ATTRIBUTE, MarqueeBox, VirtualGrid, useMarqueeSelect } from '../../../src/composites';
import type { VirtualGridHandle } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { tilesOf } from './virtual-grid-samples.constants';
import type { TileEntry } from './virtual-grid-samples.constants';

interface VirtualGridPickerProps {
  count: number;
}

const ITEM_SELECTOR = `[${MARQUEE_KEY_ATTRIBUTE}]`;

const isEmptySlot = (tile: TileEntry) => Number(tile.name) % 7 === 0;

const renderTile = (tile: TileEntry) => (
  <Box className="virtual-grid-story__tile">
    <Text>{isEmptySlot(tile) ? '' : tile.name}</Text>
  </Box>
);

const VirtualGridPicker = (props: VirtualGridPickerProps) => {
  const { count } = props;
  const areaRef = useRef<HTMLElement>(null);
  const gridRef = useRef<VirtualGridHandle>(null);
  const items = useMemo(() => tilesOf(count), [count]);
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const marquee = useMarqueeSelect({
    containerRef: areaRef, itemSelector: ITEM_SELECTOR, selected: [...picked], onChange: (keys) => setPicked(new Set(keys)), getRects: () => gridRef.current?.getRects() ?? [],
  });
  const span = marquee.cells;
  const readout = span
    ? `${picked.size} picked, cells ${span.firstColumn + 1} to ${span.lastColumn + 1} of rows ${span.firstRow + 1} to ${span.lastRow + 1}`
    : `${picked.size} picked`;
  return (
    <ValueReadout value={readout}>
      <Box className="virtual-grid-story">
        <VirtualGrid
          ref={gridRef}
          label="Sprites"
          items={items}
          getKey={(tile) => tile.id}
          getLabel={(tile) => tile.name}
          holes={isEmptySlot}
          renderItem={renderTile}
          tileSize="size-64"
          selection={{ selected: picked, onChange: setPicked }}
          scrollRef={areaRef}
          overlay={<MarqueeBox rect={marquee.rect} />}
          bind={marquee.bind}
        />
      </Box>
    </ValueReadout>
  );
};

export { VirtualGridPicker };
