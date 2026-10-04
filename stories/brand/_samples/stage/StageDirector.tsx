/* @layer stories @kind component */
import { useEffect, useRef, useState } from 'react';
import { MASCOT_CLIPS, MascotStage } from '../../../../src/brand';
import type { MascotClip, MascotStageHandle, MascotStep } from '../../../../src/brand';
import { Button, Flex, IconButton, Icon, SegmentedControl, Select, Slider, Stack, Text, Toggle } from '../../../../src/primitives';
import { BRAND_OF, MASCOT_OPTIONS } from './stage-mascots.constants';
import type { MascotKey } from './stage-mascots.constants';
import { DIRECTOR_PRESETS } from './director-presets.constants';
import type { ScriptStep } from './director-presets.constants';

type Kind = 'walk' | 'play' | 'face' | 'wait';

const KINDS = [{ value: 'walk', label: 'Walk to x' }, { value: 'play', label: 'Play clip' }, { value: 'face', label: 'Face' }, { value: 'wait', label: 'Wait' }] as const;
const CLIP_OPTIONS = MASCOT_CLIPS.map((c) => ({ value: c, label: c }));

const label = (s: ScriptStep): string => {
  if (s.kind === 'walk') return `walk to ${s.x} percent`;
  if (s.kind === 'play') return `play ${s.clip}${s.loops > 1 ? ` × ${s.loops}` : ''}`;
  if (s.kind === 'face') return `face ${s.face}`;
  return `wait ${s.ms} ms`;
};

const toStep = (s: ScriptStep, width: number): MascotStep => {
  if (s.kind === 'walk') return { moveTo: (width * s.x) / 100 };
  if (s.kind === 'play') return { play: s.clip, loop: s.loops };
  if (s.kind === 'face') return { face: s.face };
  return { wait: s.ms };
};

/** Script a sequence (walk to x, play, face, wait), run it, and replay it as often as you like. */
const StageDirector = () => {
  const stage = useRef<MascotStageHandle>(null);
  const [who, setWho] = useState<MascotKey>('sentri');
  const [script, setScript] = useState<ScriptStep[]>([...(DIRECTOR_PRESETS[0]?.steps ?? [])]);
  const [kind, setKind] = useState<Kind>('play');
  const [clip, setClip] = useState<MascotClip>('wave');
  const [x, setX] = useState(50);
  const [loops, setLoops] = useState(1);
  const [ms, setMs] = useState(600);
  const [face, setFace] = useState<'left' | 'right'>('left');
  const [repeat, setRepeat] = useState(false);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (run === 0) return undefined;
    let live = true;
    const actor = stage.current?.actor(who);
    actor?.stop();
    void actor?.queue(script.map((s) => toStep(s, stage.current?.width() ?? 0))).then((result) => {
      if (live && repeat && result === 'done') setRun((n) => n + 1);
    });
    return () => { live = false; };
  }, [run]); // eslint-disable-line react-hooks/exhaustive-deps
  const add = () => {
    const step: ScriptStep = kind === 'walk' ? { kind, x } : kind === 'play' ? { kind, clip, loops } : kind === 'face' ? { kind, face } : { kind, ms };
    setScript((list) => [...list, step]);
  };
  return (
    <Stack gap="md">
      <Flex gap="sm" align="center" wrap>
        <SegmentedControl aria-label="Mascot" size="sm" value={who} options={MASCOT_OPTIONS} onChange={setWho} />
        {DIRECTOR_PRESETS.map((p) => <Button key={p.name} size="sm" variant="secondary" onClick={() => setScript([...p.steps])}>{p.name}</Button>)}
      </Flex>
      <div className="stage-lab__frame stage-lab__frame--plain">
        <MascotStage key={who} ref={stage} cast={[{ id: who, brand: BRAND_OF[who], x: 120 }]} height={170} label="The director's stage" />
      </div>
      <Flex gap="sm" align="end" wrap>
        <SegmentedControl label="Step" size="sm" value={kind} options={[...KINDS]} onChange={setKind} />
        {kind === 'walk' && <div className="stage-lab__control"><Slider label="x" size="sm" value={x} min={0} max={100} showValue formatValue={(n) => `${n} percent`} onChange={setX} /></div>}
        {kind === 'play' && <div className="stage-lab__control"><Select aria-label="Clip" size="sm" value={clip} options={CLIP_OPTIONS} onChange={(v) => setClip(v as MascotClip)} searchable /></div>}
        {kind === 'play' && <div className="stage-lab__control"><Slider label="Times" size="sm" value={loops} min={1} max={5} showValue onChange={setLoops} /></div>}
        {kind === 'face' && <SegmentedControl aria-label="Face" size="sm" value={face} options={[{ value: 'left', label: 'left' }, { value: 'right', label: 'right' }]} onChange={setFace} />}
        {kind === 'wait' && <div className="stage-lab__control"><Slider label="Wait" size="sm" value={ms} min={100} max={3000} step={100} showValue formatValue={(n) => `${n} ms`} onChange={setMs} /></div>}
        <Button size="sm" variant="secondary" onClick={add}>Add step</Button>
      </Flex>
      <Stack gap="xs">
        {script.map((s, i) => (
          <Flex key={`${label(s)}-${i}`} gap="sm" align="center">
            <Text variant="caption">{`${i + 1}. ${label(s)}`}</Text>
            <IconButton size="sm" variant="ghost" label="Remove step" onClick={() => setScript((list) => list.filter((_, j) => j !== i))}><Icon name="x" /></IconButton>
          </Flex>
        ))}
      </Stack>
      <Flex gap="sm" align="center" wrap>
        <Button size="sm" onClick={() => setRun((n) => n + 1)} data-testid="director-run">Run the script</Button>
        <Toggle size="sm" checked={repeat} onChange={setRepeat} label="Replay when it ends" />
        <Button size="sm" variant="secondary" onClick={() => stage.current?.actor(who)?.stop()}>Stop</Button>
        <Button size="sm" variant="secondary" onClick={() => setScript([])}>Clear</Button>
      </Flex>
    </Stack>
  );
};

export { StageDirector };
