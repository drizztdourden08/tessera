/* @layer stories @kind component */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { MascotStage } from '../MascotStage';
import type { MascotClip } from '../../../src/brand';
import type { MascotStageCast, MascotStageEvent, MascotStageHandle } from '../MascotStage';
import { Box, Flex, SegmentedControl, Stack, Text } from '../../../src/primitives';
import { StageStatsLine } from './StageStatsLine';
import { StageLabActions } from './StageLabActions';
import { StageLabOptions } from './StageLabOptions';
import type { LabOptions } from './StageLabOptions';
import { BRAND_OF, useCastPicker } from './useCastPicker';
import './StageLab.css';

const describe = (e: MascotStageEvent): string =>
  [e.actor, e.type, e.clip, e.behaviour, e.result, e.x === undefined ? undefined : `x ${Math.round(e.x)}`].filter(Boolean).join(' · ');

const START: LabOptions = { walk: 'move', autonomy: false, hideExtras: false, speed: 1, height: 180 };

const StageLab = () => {
  const stage = useRef<MascotStageHandle>(null);
  const picker = useCastPicker();
  const [who, setWho] = useState('sentri');
  const [clip, setClip] = useState<MascotClip>('spin');
  const [options, setOptions] = useState<LabOptions>(START);
  const [log, setLog] = useState<string[]>([]);
  const cast = useMemo<MascotStageCast[]>(
    () => picker.members.map((m, i) => ({ id: m.id, brand: BRAND_OF[m.key], hidden: m.hidden, autonomy: options.autonomy ? { seed: i + 7 } : false })),
    [picker.members, options.autonomy],
  );
  const current = picker.members.some((m) => m.id === who) ? who : (picker.members[0]?.id ?? '');
  const onEvent = useCallback((e: MascotStageEvent) => {
    if (e.type !== 'step-start') setLog((lines) => [describe(e), ...lines].slice(0, 10));
  }, []);
  useEffect(() => {
    Object.assign(window, { mascotStage: stage.current, setStageSlow: (slow: boolean) => setOptions((o) => ({ ...o, speed: slow ? 0.25 : 1 })) });
  }, []);
  useEffect(() => {
    for (const m of picker.members) stage.current?.actor(m.id)?.effects(options.hideExtras ? 'hide' : 'auto');
  }, [options.hideExtras, picker.members]);
  const onStageClick = (event: MouseEvent) => {
    const x = stage.current?.stageX(event.clientX);
    if (x !== undefined) void stage.current?.actor(current)?.moveTo(x, { clip: options.walk });
  };
  return (
    <Stack gap="md">
      {picker.controls}
      <Box className="stage-lab__frame" onClick={onStageClick} data-testid="stage-frame">
        <MascotStage ref={stage} cast={cast} height={options.height} speed={options.speed} onEvent={onEvent} label="The mascots on the stage" />
      </Box>
      <Text variant="caption">Click the stage to send the chosen mascot walking there. Drag the bottom right corner to resize the stage.</Text>
      <Flex gap="sm" align="center" wrap>
        <SegmentedControl aria-label="Mascot to command" size="sm" value={current} options={picker.members.map((m) => ({ value: m.id, label: m.label }))} onChange={setWho} />
        <StageLabOptions value={options} onChange={setOptions} />
      </Flex>
      <StageLabActions actor={() => stage.current?.actor(current)} clip={clip} onClip={setClip} />
      <StageStatsLine stage={stage} />
      <Stack gap="xs" className="stage-lab__log">
        {log.map((line, i) => <Text key={`${line}-${i}`} variant="caption">{line}</Text>)}
      </Stack>
    </Stack>
  );
};

export { StageLab };
