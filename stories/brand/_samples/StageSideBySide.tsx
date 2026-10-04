/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { AnimatedMascot, MASCOT_CLIPS, MascotStage } from '../../../src/brand';
import type { AnimatedMascotBrand, MascotClip, MascotStageCast } from '../../../src/brand';
import { Flex, NativeSelect, SegmentedControl, Stack, Text } from '../../../src/primitives';

const BRANDS: readonly { value: AnimatedMascotBrand; label: string }[] = [
  { value: 'rotp', label: 'Sentri' },
  { value: 'brock', label: 'Flint' },
  { value: 'archipelia', label: 'Pelago' },
];

/** The approved playback (AnimatedMascot) beside the stage engine playing the same clip on a loop. */
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
        <NativeSelect aria-label="Clip" value={clip} onChange={(e) => restart(() => setClip(e.target.value as MascotClip))}>
          {MASCOT_CLIPS.map((c) => <option key={c} value={c}>{c}</option>)}
        </NativeSelect>
      </Flex>
      <Flex gap="lg" align="end" wrap>
        <Stack gap="xs" align="center">
          <AnimatedMascot key={`${brand}-${clip}-${run}`} brand={brand} animation={clip} loop scale={4} />
          <Text variant="caption">Today: AnimatedMascot</Text>
        </Stack>
        <Stack gap="xs" align="center">
          <div style={{ inlineSize: 260 }}>
            <MascotStage key={`${brand}-${clip}-${run}`} cast={cast} height={brand === 'rotp' ? 152 : 180} label="The stage engine" />
          </div>
          <Text variant="caption">Stage engine, settled into the same clip</Text>
        </Stack>
      </Flex>
    </Stack>
  );
};

export { StageSideBySide };
