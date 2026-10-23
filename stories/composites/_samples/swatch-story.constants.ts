/* @layer stories @kind data */
import type { SwatchColor } from '../../../src/composites';
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { PaletteSet, SwatchArgs } from './swatch-story.type';

const SIXTEEN: readonly SwatchColor[] = [
  { id: 'black', value: '#000000', label: 'Black' },
  { id: 'navy', value: '#1d2b53', label: 'Navy' },
  { id: 'plum', value: '#7e2553', label: 'Plum' },
  { id: 'forest', value: '#008751', label: 'Forest' },
  { id: 'brown', value: '#ab5236', label: 'Brown' },
  { id: 'slate', value: '#5f574f', label: 'Slate' },
  { id: 'silver', value: '#c2c3c7', label: 'Silver' },
  { id: 'cream', value: '#fff1e8', label: 'Cream' },
  { id: 'red', value: '#ff004d', label: 'Red' },
  { id: 'orange', value: '#ffa300', label: 'Orange' },
  { id: 'yellow', value: '#ffec27', label: 'Yellow' },
  { id: 'green', value: '#00e436', label: 'Green' },
  { id: 'sky', value: '#29adff', label: 'Sky' },
  { id: 'lilac', value: '#83769c', label: 'Lilac' },
  { id: 'pink', value: '#ff77a8', label: 'Pink' },
  { id: 'peach', value: '#ffccaa', label: 'Peach' },
];

const WITH_CLEAR: readonly SwatchColor[] = [{ id: 'clear', value: null, label: 'Clear' }, ...SIXTEEN.slice(0, 15)];

const FULL: readonly SwatchColor[] = Array.from({ length: 256 }, (_, index) => ({
  id: `colour-${String(index)}`,
  value: index === 0 ? null : `hsl(${String((index % 32) * 11.25)} 70% ${String(15 + Math.floor(index / 32) * 10)}%)`,
}));

const SWATCH_SETS: Readonly<Record<PaletteSet, readonly SwatchColor[]>> = { sixteen: SIXTEEN, clear: WITH_CLEAR, full: FULL, none: [] };

const SWATCH_ARGS: SwatchArgs = { palette: 'sixteen', size: 'md', showIndex: true };

const SWATCH_ARG_TYPES: PlaygroundArgTypes<SwatchArgs> = {
  palette: { group: 'Content', control: 'select', options: ['sixteen', 'clear', 'full', 'none'], description: 'Which palette the grid starts with.' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'], description: 'The side of each swatch.' },
  showIndex: { group: 'Appearance', control: 'boolean', description: 'The small 0-based index on each swatch.' },
};

const SWATCH_CODE = `import { SwatchGrid } from '@drizztdourden08/tessera';

<SwatchGrid
  label="Palette"
  colors={colors}
  selectedId={selectedId}
  secondaryId={backgroundId}
  range={range}
  onSelect={select}
  onSecondarySelect={selectBackground}
  onRangeChange={changeRange}
  onMove={moveColor}
  columns={8}
/>`;

export { SWATCH_ARG_TYPES, SWATCH_ARGS, SWATCH_CODE, SWATCH_SETS };
