/* @layer stories @kind component */
import { useEffect, useMemo, useRef, useState } from 'react';
import { MascotStage } from '../../../../src/brand';
import type { MascotClip, MascotStageCast, MascotStageHandle } from '../../../../src/brand';
import { Box, Button, Flex, SegmentedControl, Stack, Text } from '../../../../src/primitives';
import { BRAND_OF, MASCOT_OPTIONS, NAME_OF } from './stage-mascots.constants';
import type { MascotKey } from './stage-mascots.constants';

const TURNS: readonly (readonly [speaker: 0 | 1, clip: MascotClip])[] = [
  [0, 'wave'], [1, 'wave'], [0, 'point'], [1, 'curious'], [0, 'idea'], [1, 'happy'],
  [0, 'confused'], [1, 'point'], [0, 'happy-grin'], [1, 'success'],
];

const StageDialogue = () => {
  const stage = useRef<MascotStageHandle>(null);
  const [left, setLeft] = useState<MascotKey>('sentri');
  const [right, setRight] = useState<MascotKey>('flint');
  const [line, setLine] = useState('');
  const [take, setTake] = useState(0);
  const pair = useMemo(() => [`${left}-a`, `${right}-b`] as const, [left, right]);
  const cast = useMemo<MascotStageCast[]>(() => [
    { id: pair[0], brand: BRAND_OF[left], x: 220, face: 'right' },
    { id: pair[1], brand: BRAND_OF[right], x: 460, face: 'left' },
  ], [pair, left, right]);
  useEffect(() => {
    let live = true;
    const talk = async () => {
      await new Promise((r) => setTimeout(r, 600));
      for (let i = 0; live; i = (i + 1) % TURNS.length) {
        const [speaker, clip] = TURNS[i] ?? [0, 'wave'];
        const name = NAME_OF[speaker === 0 ? left : right];
        setLine(`${name}: ${clip}`);
        await stage.current?.actor(pair[speaker])?.play(clip, { loop: 1 });
        await new Promise((r) => setTimeout(r, 250));
      }
    };
    void talk();
    return () => {
      live = false;
    };
  }, [pair, left, right, take]);
  return (
    <Stack gap="md">
      <Flex gap="sm" align="center" wrap>
        <SegmentedControl label="Left" size="sm" value={left} options={MASCOT_OPTIONS} onChange={setLeft} />
        <SegmentedControl label="Right" size="sm" value={right} options={MASCOT_OPTIONS} onChange={setRight} />
        <Button size="sm" variant="secondary" onClick={() => setTake((n) => n + 1)}>From the top</Button>
      </Flex>
      <Box className="stage-lab__frame stage-lab__frame--plain stage-lab__frame--narrow">
        <MascotStage key={`${pair.join()}-${take}`} ref={stage} cast={cast} height={170} label="Two mascots in conversation" />
      </Box>
      <Text variant="caption" data-testid="dialogue-line">{line}</Text>
    </Stack>
  );
};

export { StageDialogue };
