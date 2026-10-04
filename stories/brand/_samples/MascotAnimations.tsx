/* @layer stories @kind component */
import { useState } from 'react';
import { AnimatedMascot, BRAND_FAMILY } from '../../../src/brand';
import { Button, Flex, Icon, Stack, Text } from '../../../src/primitives';
import { ANIMATED_BRANDS } from './mascot-brands.constants';
import type { AnyMascotAnimation } from './mascot-brands.constants';
import { VariantGroups } from './VariantGroups';

const MascotAnimations = () => {
  const [playing, setPlaying] = useState(true);
  const groups = ANIMATED_BRANDS.map((brand) => {
    const { mascot } = BRAND_FAMILY[brand];
    const clips = Object.entries(mascot?.motion?.animations ?? {});
    return {
      key: brand,
      label: mascot?.name ?? brand,
      items: clips.map(([id, clip]) => ({
        key: id,
        label: clip.name,
        node: (
          <Stack gap="sm" align="center">
            <AnimatedMascot brand={brand} animation={id as AnyMascotAnimation} playing={playing} loop scale={3} title={`${mascot?.name ?? brand}, ${clip.name}`} />
            <Text variant="caption">{clip.loop ? 'Loops.' : 'Plays once; looped here.'}</Text>
            <Text variant="caption">{clip.summary}</Text>
          </Stack>
        ),
      })),
    };
  });
  return (
    <Stack gap="lg">
      <Flex>
        <Button variant="secondary" size="sm" icon={<Icon name={playing ? 'pause' : 'play'} />} onClick={() => setPlaying((on) => !on)}>
          {playing ? 'Pause' : 'Play'}
        </Button>
      </Flex>
      <VariantGroups groups={groups} />
    </Stack>
  );
};

export { MascotAnimations };
