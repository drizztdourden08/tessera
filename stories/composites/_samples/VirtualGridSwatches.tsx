/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { VirtualGrid } from '../../../src/composites';
import type { VirtualGridCellBind, VirtualSize } from '../../../src/composites';
import { Box, Button } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { tilesOf } from './virtual-grid-samples.constants';
import type { TileEntry } from './virtual-grid-samples.constants';

const TONES = ['primary', 'success', 'warning', 'info', 'danger'] as const;

const SIZES: readonly VirtualSize[] = ['size-16', 'size-20', 'size-24'];

const renderSwatch = (tile: TileEntry, index: number, cell: VirtualGridCellBind) => (
  <Box {...cell} className={`${cell.className} virtual-grid-story__swatch`} data-tone={TONES[index % TONES.length]} aria-label={tile.name} />
);

const VirtualGridSwatches = () => {
  const [size, setSize] = useState(1);
  const [count, setCount] = useState(120);
  const items = useMemo(() => tilesOf(count), [count]);
  const add = (cell: VirtualGridCellBind) => <Button {...cell} variant="ghost" data-tile-look="dashed" onClick={() => setCount((now) => now + 1)}>+</Button>;
  return (
    <ValueReadout value={`${count} swatches, turn the wheel with Ctrl held to resize`}>
      <Box className="virtual-grid-story">
        <VirtualGrid
          label="Palette"
          items={items}
          getKey={(tile) => tile.id}
          renderTile={renderSwatch}
          density="swatch"
          tileSize={SIZES[size]}
          trailing={add}
          tileProps={(_tile, index) => (index === 0 ? { data: { 'tile-look': 'dashed' } } : {})}
          onWheelSize={(direction) => setSize((now) => Math.min(SIZES.length - 1, Math.max(0, now + direction)))}
          ownsKey={(event) => event.key === 'Delete'}
        />
      </Box>
    </ValueReadout>
  );
};

export { VirtualGridSwatches };
