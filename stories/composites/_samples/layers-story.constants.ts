/* @layer stories @kind data */
import type { ReorderItem, ReorderToggle } from '../../../src/composites';
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { LayerSet, LayersArgs } from './layers-story.type';

const LAYER_TOGGLES: readonly ReorderToggle[] = [
  { id: 'visible', label: 'Visible', iconOn: 'eye', iconOff: 'eye-off' },
  { id: 'locked', label: 'Locked', iconOn: 'lock', iconOff: 'lock-open' },
];

const SIX_LAYERS: readonly ReorderItem[] = [
  { id: 'highlights', label: 'Highlights', icon: 'sparkles', toggles: { visible: true, locked: false } },
  { id: 'shading', label: 'Shading', icon: 'sun', toggles: { visible: true, locked: false } },
  { id: 'outline', label: 'Outline', icon: 'pencil', toggles: { visible: true, locked: true } },
  { id: 'colours', label: 'Base colours', icon: 'palette', toggles: { visible: true, locked: false } },
  { id: 'sketch', label: 'Sketch', icon: 'pencil', toggles: { visible: false, locked: true } },
  { id: 'background', label: 'Background', icon: 'image', toggles: { visible: true, locked: true } },
];

const FORTY_LAYERS: readonly ReorderItem[] = Array.from({ length: 40 }, (_, index) => ({
  id: `layer-${String(index + 1)}`,
  label: `Layer ${String(index + 1)}`,
  icon: 'layers',
  toggles: { visible: index % 5 !== 0, locked: index % 7 === 0 },
}));

const LAYER_SETS: Readonly<Record<LayerSet, readonly ReorderItem[]>> = { six: SIX_LAYERS, forty: FORTY_LAYERS, none: [] };

const LAYERS_ARGS: LayersArgs = { layers: 'six', toggles: true };

const LAYERS_ARG_TYPES: PlaygroundArgTypes<LayersArgs> = {
  layers: { group: 'Content', control: 'select', options: ['six', 'forty', 'none'], description: 'How many layers the list starts with.' },
  toggles: { group: 'Content', control: 'boolean', description: 'The visible and locked icons on each row.' },
};

const LAYERS_CODE = `import { ReorderList } from '@drizztdourden08/tessera';

<ReorderList
  label="Layers"
  items={layers}
  toggles={[
    { id: 'visible', label: 'Visible', iconOn: 'eye', iconOff: 'eye-off' },
    { id: 'locked', label: 'Locked', iconOn: 'lock', iconOff: 'lock-open' },
  ]}
  selectedId={selectedId}
  onSelect={setSelectedId}
  onMove={moveLayer}
  onToggle={setLayerToggle}
/>`;

export { LAYER_SETS, LAYER_TOGGLES, LAYERS_ARG_TYPES, LAYERS_ARGS, LAYERS_CODE, SIX_LAYERS };
