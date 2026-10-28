/* @layer stories @kind component */
import { useMemo } from 'react';
import { VirtualGrid } from '../../../src/composites';
import type { VirtualSize } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { tilesOf } from './virtual-grid-samples.constants';
import type { TileEntry } from './virtual-grid-samples.constants';

interface VirtualGridFrameProps {
  count: number;
  tileSize?: VirtualSize;
  tileWidth?: VirtualSize;
  tileHeight?: VirtualSize;
  columns?: number;
  onActiveChange?: (index: number) => void;
}

const renderTile = (tile: TileEntry) => (
  <Box className="virtual-grid-story__tile">
    <Text>{tile.name}</Text>
  </Box>
);

const VirtualGridFrame = (props: VirtualGridFrameProps) => {
  const { count, tileSize, tileWidth, tileHeight, columns, onActiveChange } = props;
  const items = useMemo(() => tilesOf(count), [count]);
  return (
    <Box className="virtual-grid-story">
      <VirtualGrid
        label="Sprites"
        items={items}
        getKey={(tile) => tile.id}
        renderItem={renderTile}
        tileSize={tileSize}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
        columns={columns}
        onActiveChange={onActiveChange}
      />
    </Box>
  );
};

export { VirtualGridFrame };
