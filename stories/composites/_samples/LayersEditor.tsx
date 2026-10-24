/* @layer stories @kind component */
import { useState } from 'react';
import { ReorderList } from '../../../src/composites';
import type { ReorderItem } from '../../../src/composites';
import { Box, Image, Text } from '../../../src/primitives';
import { HERO_SAMPLE_URLS } from './hero-sample-urls.constants';
import { LAYER_TOGGLES, SIX_LAYERS } from './layers-story.constants';
import { useLayers } from './useLayers';

const THUMBS = [HERO_SAMPLE_URLS.night, HERO_SAMPLE_URLS.dunes, HERO_SAMPLE_URLS.tile];

const WITH_THUMBS: readonly ReorderItem[] = SIX_LAYERS.map((layer, index) => ({
  ...layer,
  media: <Image src={THUMBS[index % THUMBS.length] ?? ''} alt="" fit="cover" pixelated />,
}));

const LayersEditor = () => {
  const { layers, selectedId, select, move, toggle, rename } = useLayers(WITH_THUMBS);
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <Box className="layers-story__frame">
      <ReorderList
        label="Layers"
        items={layers}
        toggles={LAYER_TOGGLES}
        selectedId={selectedId}
        mediaAspect={1}
        onSelect={select}
        onActivate={(id) => setOpened(id)}
        onRename={rename}
        onMove={move}
        onToggle={toggle}
      />
      <Text tone="muted">{opened === null ? 'Press Enter or double-click a layer to open it. F2 renames.' : `Opened ${opened}`}</Text>
    </Box>
  );
};

export { LayersEditor };
