/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { MARQUEE_KEY_ATTRIBUTE, MarqueeBox, VirtualGrid, useMarqueeSelect } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { tilesOf } from './virtual-grid-samples.constants';
import type { TileEntry } from './virtual-grid-samples.constants';

interface VirtualGridMarqueeProps {
  count: number;
}

const ITEM_SELECTOR = `[${MARQUEE_KEY_ATTRIBUTE}]`;

const VirtualGridMarquee = (props: VirtualGridMarqueeProps) => {
  const { count } = props;
  const areaRef = useRef<HTMLElement>(null);
  const items = useMemo(() => tilesOf(count), [count]);
  const [picked, setPicked] = useState<readonly string[]>([]);
  const marquee = useMarqueeSelect({ containerRef: areaRef, itemSelector: ITEM_SELECTOR, selected: picked, onChange: setPicked });
  const renderTile = (tile: TileEntry) => (
    <Box className={picked.includes(tile.id) ? 'virtual-grid-story__tile virtual-grid-story__tile--picked' : 'virtual-grid-story__tile'}>
      <Text>{tile.name}</Text>
    </Box>
  );
  return (
    <ValueReadout value={`${picked.length} picked`}>
      <Box className="virtual-grid-story">
        <VirtualGrid
          label="Sprites"
          items={items}
          getKey={(tile) => tile.id}
          renderItem={renderTile}
          tileSize="size-64"
          scrollRef={areaRef}
          bind={marquee.bind}
          overlay={<MarqueeBox rect={marquee.rect} />}
        />
      </Box>
    </ValueReadout>
  );
};

export { VirtualGridMarquee };
