/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { VirtualGrid, useNativeDragGhost } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { foldersOf } from './virtual-grid-samples.constants';
import type { DragEvent } from 'react';
import type { TileEntry } from './virtual-grid-samples.constants';

const renderTile = (tile: TileEntry) => (
  <Box className="virtual-grid-story__tile">
    <Text>{tile.name}</Text>
  </Box>
);

const takesText = (data: DataTransfer) => data.types.includes('text/plain');

const VirtualGridNativeDrop = () => {
  const ghost = useNativeDragGhost();
  const [received, setReceived] = useState<readonly string[]>([]);
  const sections = useMemo(() => foldersOf(3, 8).map((folder) => ({
    ...folder,
    accepts: takesText,
    onDropData: (data: DataTransfer) => setReceived((now) => [...now, `${data.getData('text/plain')} into ${folder.label}`]),
  })), []);
  const start = (event: DragEvent<HTMLElement>) => {
    event.dataTransfer.setData('text/plain', 'Three files');
    ghost.onDragStart(event, { count: 3 });
  };
  return (
    <ValueReadout value={received.length === 0 ? 'drag the box onto a folder header' : received}>
      <Box className="virtual-grid-story__source" draggable onDragStart={start}><Text>Drag three files</Text></Box>
      <Box className="virtual-grid-story">
        <VirtualGrid label="Folders" sections={sections} getKey={(tile) => tile.id} renderItem={renderTile} tileSize="size-64" />
      </Box>
    </ValueReadout>
  );
};

export { VirtualGridNativeDrop };
