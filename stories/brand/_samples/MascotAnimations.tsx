/* @layer stories @kind component */
import { useState } from 'react';
import { AnimatedMascot, BRAND_FAMILY, MASCOT_CLIP_GROUPS, MASCOT_CLIP_VARIANTS } from '../../../src/brand';
import type { AnimatedMascotBrand, MascotClip } from '../../../src/brand';
import { Button, Flex, Icon, Stack, Text } from '../../../src/primitives';
import { clipLabel } from './clip-label';
import { VariantGroups } from './VariantGroups';

interface MascotAnimationsProps {
  brand: AnimatedMascotBrand;
}

const clipNote = (id: MascotClip, loop: boolean | undefined): string => {
  const original = MASCOT_CLIP_VARIANTS[id];
  return `${original ? `${id}, a variant of ${original}.` : `${id}.`} ${loop ? 'Loops.' : 'Plays once; looped here.'}`;
};

const clipItem = (brand: AnimatedMascotBrand, id: MascotClip, playing: boolean) => {
  const mascot = BRAND_FAMILY[brand].mascot;
  const clip = mascot?.motion?.animations[id];
  const label = clipLabel(id);
  return {
    key: id,
    label,
    node: (
      <Stack gap="sm" align="center">
        <AnimatedMascot brand={brand} animation={id} playing={playing} loop scale={3} title={`${mascot?.name ?? brand}, ${label}`} />
        <Text variant="caption">{clipNote(id, clip?.loop)}</Text>
        <Text variant="caption">{clip?.summary}</Text>
      </Stack>
    ),
  };
};

const MascotAnimations = (props: MascotAnimationsProps) => {
  const { brand } = props;
  const [playing, setPlaying] = useState(true);
  const groups = MASCOT_CLIP_GROUPS.map((group) => ({ key: group.id, label: group.label, items: group.clips.map((id) => clipItem(brand, id, playing)) }));
  return (
    <Stack gap="lg">
      <Flex gap="md" align="center">
        <Button variant="secondary" size="sm" icon={<Icon name={playing ? 'pause' : 'play'} />} onClick={() => setPlaying((on) => !on)}>
          {playing ? 'Pause' : 'Play'}
        </Button>
      </Flex>
      <VariantGroups groups={groups} />
    </Stack>
  );
};

export { MascotAnimations };
