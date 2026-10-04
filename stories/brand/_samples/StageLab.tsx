/* @layer stories @kind component */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { MASCOT_CLIPS, MascotStage } from '../../../src/brand';
import type { MascotClip, MascotStageCast, MascotStageEvent, MascotStageHandle } from '../../../src/brand';
import { Button, Flex, NativeSelect, SegmentedControl, Stack, Text, Toggle } from '../../../src/primitives';
import { StageStatsLine } from './StageStatsLine';
import './StageLab.css';

type ActorId = 'sentri' | 'flint' | 'pelago';

const ACTORS: readonly { value: ActorId; label: string }[] = [
  { value: 'sentri', label: 'Sentri' },
  { value: 'flint', label: 'Flint' },
  { value: 'pelago', label: 'Pelago' },
];

const BRANDS = { sentri: 'rotp', flint: 'brock', pelago: 'archipelia' } as const;

const describe = (e: MascotStageEvent): string =>
  [e.actor, e.type, e.clip, e.behaviour, e.result, e.x === undefined ? undefined : `x ${Math.round(e.x)}`].filter(Boolean).join(' · ');

/** The stage playground: three mascots on a stage you can resize; click the stage to send one walking. */
const StageLab = () => {
  const stage = useRef<MascotStageHandle>(null);
  const [who, setWho] = useState<ActorId>('sentri');
  const [clip, setClip] = useState<MascotClip>('spin');
  const [walk, setWalk] = useState<'move' | 'move-wobble'>('move');
  const [autonomy, setAutonomy] = useState(false);
  const [hideExtras, setHideExtras] = useState(false);
  const [slow, setSlow] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const cast = useMemo<MascotStageCast[]>(() => ACTORS.map((a, i) => ({ id: a.value, brand: BRANDS[a.value], autonomy: autonomy ? { seed: i + 7 } : false })), [autonomy]);
  const onEvent = useCallback((e: MascotStageEvent) => {
    if (e.type === 'step-start') return;
    setLog((lines) => [describe(e), ...lines].slice(0, 10));
  }, []);
  const actor = () => stage.current?.actor(who);
  useEffect(() => {
    Object.assign(window, { mascotStage: stage.current, setStageSlow: setSlow });
  }, []);
  useEffect(() => {
    for (const a of ACTORS) stage.current?.actor(a.value)?.effects(hideExtras ? 'hide' : 'auto');
  }, [hideExtras]);
  const onStageClick = (event: MouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    void actor()?.moveTo(event.clientX - box.left, { clip: walk });
  };
  const interruptDemo = () => {
    void actor()?.play('spin');
    window.setTimeout(() => void actor()?.play('alert-exclaim'), 700);
  };
  return (
    <Stack gap="md">
      <div className="stage-lab__frame" onClick={onStageClick} data-testid="stage-frame">
        <MascotStage ref={stage} cast={cast} height={180} speed={slow ? 0.25 : 1} onEvent={onEvent} label="Sentri, Flint and Pelago on the stage" />
      </div>
      <Text variant="caption">Click the stage to send the chosen mascot walking there. Drag the bottom right corner to resize the stage.</Text>
      <Flex gap="sm" align="center" wrap>
        <SegmentedControl aria-label="Mascot" value={who} options={[...ACTORS]} onChange={setWho} />
        <NativeSelect aria-label="Clip" value={clip} onChange={(e) => setClip(e.target.value as MascotClip)}>
          {MASCOT_CLIPS.map((c) => <option key={c} value={c}>{c}</option>)}
        </NativeSelect>
        <Button size="sm" onClick={() => void actor()?.play(clip)}>Play now</Button>
        <Button size="sm" variant="secondary" onClick={() => void actor()?.queue([{ play: clip }])}>Queue</Button>
        <Button size="sm" variant="secondary" onClick={interruptDemo}>Spin, then alert mid-spin</Button>
        <Button size="sm" variant="secondary" onClick={() => void actor()?.face('left')}>Face left</Button>
        <Button size="sm" variant="secondary" onClick={() => void actor()?.face('right')}>Face right</Button>
        <Button size="sm" variant="secondary" onClick={() => void actor()?.play('working', { at: 60, face: 'right', loop: 3 })}>Work at the left edge</Button>
        <Button size="sm" variant="secondary" onClick={() => actor()?.stop()}>Stop</Button>
      </Flex>
      <Flex gap="md" align="center" wrap>
        <SegmentedControl aria-label="Walk" value={walk} options={[{ value: 'move', label: 'move' }, { value: 'move-wobble', label: 'move-wobble' }]} onChange={setWalk} />
        <Toggle checked={autonomy} onChange={setAutonomy} label="Autonomous" />
        <Toggle checked={hideExtras} onChange={setHideExtras} label="Hide extras" />
        <Toggle checked={slow} onChange={setSlow} label="Slow motion" />
        <Button size="sm" variant="secondary" onClick={() => actor()?.effect('laptop', 'show')}>Show laptop</Button>
        <Button size="sm" variant="secondary" onClick={() => actor()?.effect('laptop', 'auto')}>Laptop back to auto</Button>
      </Flex>
      <StageStatsLine stage={stage} />
      <Stack gap="xs" className="stage-lab__log">
        {log.map((line, i) => <Text key={`${line}-${i}`} variant="caption">{line}</Text>)}
      </Stack>
    </Stack>
  );
};

export { StageLab };
