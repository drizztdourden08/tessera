/* @layer stories @kind component */
import { useState } from 'react';
import { AnimatedMascot } from '../../../src/brand';
import { Button, Flex, Icon, Stack, Text } from '../../../src/primitives';
import { SENTRI_ANIMATIONS, SENTRI_MOTION } from './mascot-brands.constants';
import { VariantGrid } from './VariantGrid';

const MascotAnimations = () => {
  const [playing, setPlaying] = useState(true);
  const items = SENTRI_ANIMATIONS.map((id) => {
    const clip = SENTRI_MOTION?.animations[id];
    return {
      key: id,
      label: clip?.name ?? id,
      node: (
        <Stack gap="sm" align="center">
          <AnimatedMascot brand="rotp" animation={id} playing={playing} loop scale={3} title={`Sentri, ${clip?.name ?? id}`} />
          <Text variant="caption">{clip?.loop ? 'Loops.' : 'Plays once; looped here.'}</Text>
          <Text variant="caption">{clip?.summary}</Text>
        </Stack>
      ),
    };
  });
  return (
    <Stack gap="lg">
      <Flex>
        <Button variant="secondary" size="sm" icon={<Icon name={playing ? 'pause' : 'play'} />} onClick={() => setPlaying((on) => !on)}>
          {playing ? 'Pause' : 'Play'}
        </Button>
      </Flex>
      <VariantGrid items={items} />
    </Stack>
  );
};

export { MascotAnimations };
