/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { VirtualGrid } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { intoFolder, moveInFolders } from './move-in-folders';
import { foldersOf } from './virtual-grid-samples.constants';
import type { TileEntry } from './virtual-grid-samples.constants';

const renderTile = (tile: TileEntry) => (
  <Box className="virtual-grid-story__tile">
    <Text>{tile.name}</Text>
  </Box>
);

const VirtualGridReorder = () => {
  const [folders, setFolders] = useState(() => foldersOf(3, 14));
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const sections = useMemo(
    () => folders.map((folder) => ({ ...folder, onDrop: (keys: readonly string[]) => setFolders((now) => intoFolder(now, keys, folder.key)) })),
    [folders],
  );
  return (
    <ValueReadout value={`${picked.size} picked, drag a tile, or press Alt with an arrow`}>
      <Box className="virtual-grid-story">
        <VirtualGrid
          label="Sprites"
          sections={sections}
          getKey={(tile) => tile.id}
          renderItem={renderTile}
          tileSize="size-64"
          selection={{ selected: picked, onChange: setPicked }}
          reorder={{ onMove: (move) => setFolders((now) => moveInFolders(now, move.keys, move.to)), renderThumbnail: renderTile }}
        />
      </Box>
    </ValueReadout>
  );
};

export { VirtualGridReorder };
