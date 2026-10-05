/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { AnimatedMascot, MASCOT_CLIPS, MascotStage } from '../../../../src/brand';
import type { MascotStageCast, MascotStageHandle } from '../../../../src/brand';
import { Flex, SegmentedControl, Stack, Text } from '../../../../src/primitives';
import { StageStatsLine } from './StageStatsLine';

const BRANDS = ['rotp', 'brock', 'archipelia'] as const;
const COUNTS = ['3', '9', '18', '30'] as const;
const LOOPED = MASCOT_CLIPS.filter((c) => !['move', 'move-wobble'].includes(c));

const StageCrowd = () => {
  const stage = useRef<MascotStageHandle>(null);
  const [count, setCount] = useState<(typeof COUNTS)[number]>('9');
  const [mode, setMode] = useState<'stage' | 'today'>('stage');
  const cast = useMemo<MascotStageCast[]>(
    () => Array.from({ length: Number(count) }, (_, i) => ({ id: `m${i}`, brand: BRANDS[i % 3] ?? 'rotp', autonomy: { seed: i + 1, pause: [600, 2000] }, size: 0.6 })),
    [count],
  );
  return (
    <Stack gap="md">
      <Flex gap="sm" wrap>
        <SegmentedControl aria-label="How many mascots" value={count} options={COUNTS.map((c) => ({ value: c, label: `${c} mascots` }))} onChange={setCount} />
        <SegmentedControl aria-label="Engine" value={mode} options={[{ value: 'stage', label: 'Stage engine' }, { value: 'today', label: 'Today: AnimatedMascot' }]} onChange={setMode} />
      </Flex>
      {mode === 'stage' ? (
        <>
          <MascotStage key={count} ref={stage} cast={cast} height={200} label="A crowd of mascots" />
          <StageStatsLine stage={stage} />
        </>
      ) : (
        <Flex gap="xs" wrap>
          {cast.map((c, i) => <AnimatedMascot key={c.id} brand={c.brand} animation={LOOPED[(i * 7) % LOOPED.length]} loop scale={2} />)}
        </Flex>
      )}
      <Text variant="caption">Every stage mascot runs its own autonomous mode with a fixed seed, so a run repeats.</Text>
    </Stack>
  );
};

export { StageCrowd };
