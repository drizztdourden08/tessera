/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { MascotStage } from '../../../../src/brand';
import type { MascotStageCast, MascotStageHandle } from '../../../../src/brand';
import { SegmentedControl, Stack, Text } from '../../../../src/primitives';
import { StageStatsLine } from './StageStatsLine';

const BRANDS = ['rotp', 'brock', 'archipelia'] as const;
const COUNTS = ['3', '9', '18', '30'] as const;

const StageCrowd = () => {
  const stage = useRef<MascotStageHandle>(null);
  const [count, setCount] = useState<(typeof COUNTS)[number]>('9');
  const cast = useMemo<MascotStageCast[]>(
    () => Array.from({ length: Number(count) }, (_, i) => ({ id: `m${i}`, brand: BRANDS[i % 3] ?? 'rotp', autonomy: { seed: i + 1, pause: [600, 2000] }, size: 0.6 })),
    [count],
  );
  return (
    <Stack gap="md">
      <SegmentedControl aria-label="How many mascots" value={count} options={COUNTS.map((c) => ({ value: c, label: `${c} mascots` }))} onChange={setCount} />
      <MascotStage key={count} ref={stage} cast={cast} height={200} label="A crowd of mascots" />
      <StageStatsLine stage={stage} />
      <Text variant="caption">Every mascot runs its own autonomous mode with a fixed seed, so a run repeats.</Text>
    </Stack>
  );
};

export { StageCrowd };
