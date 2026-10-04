/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { MascotStage } from '../../../../src/brand';
import type { MascotClip, MascotStageCast, MascotStageHandle } from '../../../../src/brand';
import { Button, Flex, SegmentedControl, Stack, Text } from '../../../../src/primitives';
import { STAGE_MASCOTS } from './stage-mascots.constants';

type Motion = 'system' | 'full' | 'reduced';

/** The same stage with the reduced motion setting previewed: still pictures that cross-fade, walks that jump. */
const StageReduced = () => {
  const stage = useRef<MascotStageHandle>(null);
  const [motion, setMotion] = useState<Motion>('reduced');
  const cast = useMemo<MascotStageCast[]>(() => STAGE_MASCOTS.map((m) => ({ id: m.key, brand: m.brand })), []);
  const all = (clip: MascotClip) => {
    for (const m of STAGE_MASCOTS) void stage.current?.actor(m.key)?.play(clip, { loop: true });
  };
  const scatter = () => {
    for (const m of STAGE_MASCOTS) void stage.current?.actor(m.key)?.moveTo(Math.random() * (stage.current?.width() ?? 0));
  };
  return (
    <Stack gap="md">
      <Flex gap="sm" align="center" wrap>
        <SegmentedControl aria-label="Motion" size="sm" value={motion} options={[{ value: 'system', label: 'Follow the system' }, { value: 'full', label: 'Full motion' }, { value: 'reduced', label: 'Reduced motion' }]} onChange={setMotion} />
        <Button size="sm" variant="secondary" onClick={() => all('sleep')}>Sleep</Button>
        <Button size="sm" variant="secondary" onClick={() => all('confused')}>Confused</Button>
        <Button size="sm" variant="secondary" onClick={() => all('working')}>Working</Button>
        <Button size="sm" variant="secondary" onClick={() => all('love')}>Love</Button>
        <Button size="sm" variant="secondary" onClick={scatter}>Walk somewhere</Button>
      </Flex>
      <div className="stage-lab__frame stage-lab__frame--plain">
        <MascotStage ref={stage} cast={cast} height={170} motion={motion} label="Mascots with reduced motion" />
      </div>
      <Text variant="caption">With reduced motion each clip shows its still picture with its symbols, pictures cross-fade, walks jump to the spot and turns are instant.</Text>
    </Stack>
  );
};

export { StageReduced };
