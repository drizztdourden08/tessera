/* @layer stories @kind component */
import { useMemo, useRef } from 'react';
import { VirtualGrid } from '../../../src/composites';
import type { VirtualGridHandle } from '../../../src/composites';
import { Box, Button, ButtonRow, Text } from '../../../src/primitives';
import { tilesOf } from './virtual-grid-samples.constants';
import type { TileEntry } from './virtual-grid-samples.constants';

interface VirtualGridJumpProps {
  count: number;
}

const renderTile = (tile: TileEntry) => (
  <Box className="virtual-grid-story__tile">
    <Text>{tile.name}</Text>
  </Box>
);

const VirtualGridJump = (props: VirtualGridJumpProps) => {
  const { count } = props;
  const gridRef = useRef<VirtualGridHandle>(null);
  const items = useMemo(() => tilesOf(count), [count]);
  return (
    <Box className="story-column">
      <ButtonRow>
        <Button variant="ghost" size="sm" onClick={() => gridRef.current?.scrollToIndex(0, 'start')}>First</Button>
        <Button variant="ghost" size="sm" onClick={() => gridRef.current?.scrollToIndex(Math.floor(count / 2), 'center')}>Middle</Button>
        <Button variant="ghost" size="sm" onClick={() => gridRef.current?.scrollToIndex(count - 1, 'end')}>Last</Button>
      </ButtonRow>
      <Box className="virtual-grid-story">
        <VirtualGrid ref={gridRef} label="Sprites" items={items} getKey={(tile) => tile.id} renderItem={renderTile} tileSize="size-64" />
      </Box>
    </Box>
  );
};

export { VirtualGridJump };
