/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Text, Toggle } from '../../src/primitives';
import type { IconEffectKind, IconEffectSize, IconName } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { IconEffectSpecimen } from './IconEffectSpecimen';

const KINDS: readonly IconEffectKind[] = ['twinkle', 'glint', 'ping', 'burst', 'dot', 'comet', 'shimmer'];
const SIZES: readonly IconEffectSize[] = ['sm', 'md', 'lg'];
const NAMES: readonly IconName[] = ['search', 'settings', 'star', 'gamepad-2', 'heart'];
const DEMO_EVERY = 1600;

const IconEffectsGallery = () => {
  const [showSamples, setShowSamples] = useState(false);
  return (
    <Box className="story-column">
      <Toggle checked={showSamples} onChange={setShowSamples} label="Show sampled points" description="Dots every point a pop can land on." />
      <Demonstrator
        rows={KINDS.map((kind) => ({ key: kind, label: `effect="${kind}"` }))}
        columns={NAMES.map((name) => ({ key: name, label: name }))}
        cell={(kind, name) => (
          <IconEffectSpecimen
            name={name}
            size={40}
            effect={{ kind, every: DEMO_EVERY }}
            showSamples={showSamples}
            className="icon-demo--primary"
          />
        )}
      />
      <Text className="story-label">Each kind at size sm, md and lg. The pop grows and its line stays as thin.</Text>
      <Demonstrator
        rows={KINDS.map((kind) => ({ key: kind, label: kind }))}
        columns={SIZES.map((size) => ({ key: size, label: `size: '${size}'` }))}
        cell={(kind, size) => (
          <IconEffectSpecimen
            name="star"
            size={40}
            effect={{ kind, size, every: DEMO_EVERY, count: 2 }}
            showSamples={false}
            className="icon-demo--primary"
          />
        )}
      />
    </Box>
  );
};

export { IconEffectsGallery };
