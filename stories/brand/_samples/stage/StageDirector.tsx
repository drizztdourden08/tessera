/* @layer stories @kind component */
import { useEffect, useRef, useState } from 'react';
import { MascotStage } from '../../../../src/brand';
import type { MascotStageHandle, MascotStep } from '../../../../src/brand';
import { Box, Button, Flex, Icon, IconButton, SegmentedControl, Stack, Text, Toggle } from '../../../../src/primitives';
import { DirectorStepEditor } from './DirectorStepEditor';
import { BRAND_OF, MASCOT_OPTIONS } from './stage-mascots.constants';
import type { MascotKey } from './stage-mascots.constants';
import { DIRECTOR_PRESETS } from './director-presets.constants';
import type { ScriptStep } from './director-presets.constants';


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

const StageDirector = () => {
  const stage = useRef<MascotStageHandle>(null);
  const [who, setWho] = useState<MascotKey>('sentri');
  const [script, setScript] = useState<ScriptStep[]>([...(DIRECTOR_PRESETS[0]?.steps ?? [])]);
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
  }, [run]);
  return (
    <Stack gap="md">
      <Flex gap="sm" align="center" wrap>
        <SegmentedControl aria-label="Mascot" size="sm" value={who} options={MASCOT_OPTIONS} onChange={setWho} />
        {DIRECTOR_PRESETS.map((p) => <Button key={p.name} size="sm" variant="secondary" onClick={() => setScript([...p.steps])}>{p.name}</Button>)}
      </Flex>
      <Box className="stage-lab__frame stage-lab__frame--plain">
        <MascotStage key={who} ref={stage} cast={[{ id: who, brand: BRAND_OF[who], x: 120 }]} height={170} label="The director's stage" />
      </Box>
      <DirectorStepEditor onAdd={(step) => setScript((list) => [...list, step])} />
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
