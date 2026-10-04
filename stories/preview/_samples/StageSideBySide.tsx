/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { AnimatedMascot, MASCOT_CLIPS } from '../../../src/brand';
import { MascotStage } from '../MascotStage';
import type { AnimatedMascotBrand, MascotClip } from '../../../src/brand';
import type { MascotStageCast } from '../MascotStage';
import { Box, Flex, SegmentedControl, Select, Stack, Text } from '../../../src/primitives';

const BRANDS: readonly { value: AnimatedMascotBrand; label: string }[] = [
  { value: 'rotp', label: 'Sentri' },
  { value: 'brock', label: 'Flint' },
  { value: 'archipelia', label: 'Pelago' },
];

const StageSideBySide = () => {
  const [brand, setBrand] = useState<AnimatedMascotBrand>('rotp');
  const [clip, setClip] = useState<MascotClip>('spin');
  const [run, setRun] = useState(0);
  const cast = useMemo<MascotStageCast[]>(() => [{ id: `solo-${run}`, brand, rest: clip }], [brand, clip, run]);
  const restart = (next: () => void) => {
    next();
    setRun((n) => n + 1);
  };
  return (
    <Stack gap="md">
      <Flex gap="sm" align="center" wrap>
        <SegmentedControl aria-label="Mascot" value={brand} options={[...BRANDS]} onChange={(b) => restart(() => setBrand(b))} />
        <Box className="stage-lab__control">
          <Select aria-label="Clip" size="sm" value={clip} options={MASCOT_CLIPS.map((c) => ({ value: c, label: c }))} onChange={(v) => restart(() => setClip(v as MascotClip))} searchable />
        </Box>
      </Flex>
      <Flex gap="lg" align="end" wrap>
        <Stack gap="xs" align="center">
          <AnimatedMascot key={`${brand}-${clip}-${run}`} brand={brand} animation={clip} loop scale={4} />
          <Text variant="caption">Today: AnimatedMascot</Text>
        </Stack>
        <Stack gap="xs" align="center">
          <Box className="stage-lab__solo">
            <MascotStage key={`${brand}-${clip}-${run}`} cast={cast} height={brand === 'rotp' ? 152 : 180} label="The stage engine" />
          </Box>
          <Text variant="caption">Stage engine, settled into the same clip</Text>
        </Stack>
      </Flex>
    </Stack>
  );
};

export { StageSideBySide };
