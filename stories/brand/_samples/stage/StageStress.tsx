/* @layer stories @kind component */
import { useEffect, useMemo, useRef, useState } from 'react';
import { MASCOT_CLIPS, MascotStage } from '../../../../src/brand';
import type { MascotStageCast, MascotStageHandle } from '../../../../src/brand';
import { Flex, Slider, Stack, Text, Toggle } from '../../../../src/primitives';
import { StageStatsLine } from '../StageStatsLine';
import { STAGE_MASCOTS } from './stage-mascots.constants';

const pick = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)] as T;

/** Fires a random command at a random mascot every few hundred milliseconds: clips, walks and turns cut in mid-clip. */
const StageStress = () => {
  const stage = useRef<MascotStageHandle>(null);
  const [running, setRunning] = useState(true);
  const [every, setEvery] = useState(300);
  const [count, setCount] = useState(0);
  const [last, setLast] = useState('');
  const cast = useMemo<MascotStageCast[]>(() => STAGE_MASCOTS.map((m) => ({ id: m.key, brand: m.brand })), []);
  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(() => {
      const handle = stage.current;
      const who = pick(STAGE_MASCOTS);
      const actor = handle?.actor(who.key);
      if (!handle || !actor) return;
      const roll = Math.random();
      if (roll < 0.6) {
        const clip = pick(MASCOT_CLIPS);
        void actor.play(clip);
        setLast(`${who.name} plays ${clip}`);
      } else if (roll < 0.85) {
        const x = Math.round(Math.random() * handle.width());
        void actor.moveTo(x);
        setLast(`${who.name} walks to ${x}`);
      } else {
        const face = actor.state().facing === 'left' ? 'right' : 'left';
        void actor.face(face);
        setLast(`${who.name} faces ${face}`);
      }
      setCount((n) => n + 1);
    }, every);
    return () => window.clearInterval(timer);
  }, [running, every]);
  return (
    <Stack gap="md">
      <Flex gap="md" align="center" wrap>
        <Toggle size="sm" checked={running} onChange={setRunning} label="Interrupt" />
        <div className="stage-lab__control"><Slider label="Every" size="sm" value={every} min={100} max={1500} step={50} showValue formatValue={(n) => `${n} ms`} onChange={setEvery} /></div>
      </Flex>
      <div className="stage-lab__frame stage-lab__frame--plain">
        <MascotStage ref={stage} cast={cast} height={180} label="Mascots under random interruptions" />
      </div>
      <Text variant="caption" data-testid="stress-count">{`${count} commands so far · last: ${last}`}</Text>
      <StageStatsLine stage={stage} />
    </Stack>
  );
};

export { StageStress };
