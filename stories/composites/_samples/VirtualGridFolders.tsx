/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { VirtualGrid } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { foldersOf } from './virtual-grid-samples.constants';
import type { TileEntry } from './virtual-grid-samples.constants';

interface VirtualGridFoldersProps {
  folders: number;
  perFolder: number;
}

const renderTile = (tile: TileEntry) => (
  <Box className="virtual-grid-story__tile">
    <Text>{tile.name}</Text>
  </Box>
);

const VirtualGridFolders = (props: VirtualGridFoldersProps) => {
  const { folders, perFolder } = props;
  const sections = useMemo(() => foldersOf(folders, perFolder), [folders, perFolder]);
  const [closed, setClosed] = useState<readonly string[]>([]);
  const toggle = (key: string, collapsed: boolean) => setClosed((before) => (collapsed ? [...before, key] : before.filter((entry) => entry !== key)));
  return (
    <ValueReadout value={closed}>
      <Box className="virtual-grid-story">
        <VirtualGrid label="Folders" sections={sections} getKey={(tile) => tile.id} renderItem={renderTile} tileSize="size-64" collapsed={closed} onToggleSection={toggle} />
      </Box>
    </ValueReadout>
  );
};

export { VirtualGridFolders };
