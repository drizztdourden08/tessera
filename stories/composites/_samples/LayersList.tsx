/* @layer stories @kind component */
import { ReorderList } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { LAYER_SETS, LAYER_TOGGLES } from './layers-story.constants';
import type { LayersListProps } from './layers-story.type';
import { useLayers } from './useLayers';

const LayersList = ({ layers: set = 'six', toggles = true, tall = false }: LayersListProps) => {
  const { layers, selectedId, select, move, toggle } = useLayers(LAYER_SETS[set]);
  return (
    <Box className={`layers-story__frame${tall ? ' layers-story__frame--tall' : ''}`}>
      <ReorderList
        label="Layers"
        items={layers}
        toggles={toggles ? LAYER_TOGGLES : undefined}
        selectedId={selectedId}
        onSelect={select}
        onMove={move}
        onToggle={toggle}
        empty="No layers yet."
      />
    </Box>
  );
};

export { LayersList };
