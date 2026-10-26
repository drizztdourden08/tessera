/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { VirtualGrid } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { tilesOf } from './virtual-grid-samples.constants';

interface VirtualGridButtonsProps {
  count: number;
}

const VirtualGridButtons = (props: VirtualGridButtonsProps) => {
  const { count } = props;
  const items = useMemo(() => tilesOf(count), [count]);
  const [opened, setOpened] = useState('none');
  return (
    <Box className="virtual-grid-story">
      <Text>{`Opened: ${opened}`}</Text>
      <VirtualGrid
        label="Sprite buttons"
        items={items}
        getKey={(tile) => tile.id}
        renderTile={(tile, _index, cell) => (
          <Button {...cell} className={`${cell.className} virtual-grid-story__tile`} onClick={() => setOpened(tile.name)}>
            {tile.name}
          </Button>
        )}
      />
    </Box>
  );
};

export { VirtualGridButtons };
