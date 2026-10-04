/* @layer stories @kind component */
import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { MascotStage } from '../../../../src/brand';
import type { MascotStageHandle } from '../../../../src/brand';
import { Flex, SegmentedControl, Slider, Stack, Text } from '../../../../src/primitives';
import { BRAND_OF, MASCOT_OPTIONS } from './stage-mascots.constants';
import type { MascotKey } from './stage-mascots.constants';

const RETARGET_MS = 120;

/** The mascot walks to where the pointer hovers, looks around when it leaves, and hops where you click. */
const StageFollow = () => {
  const stage = useRef<MascotStageHandle>(null);
  const last = useRef(0);
  const [who, setWho] = useState<MascotKey>('pelago');
  const [speed, setSpeed] = useState(160);
  const actor = () => stage.current?.actor(who);
  const onMove = (event: PointerEvent) => {
    if (event.timeStamp - last.current < RETARGET_MS) return;
    last.current = event.timeStamp;
    const x = stage.current?.stageX(event.clientX);
    if (x !== undefined) void actor()?.moveTo(x, { speed });
  };
  const onClick = (event: PointerEvent) => {
    const x = stage.current?.stageX(event.clientX);
    if (x !== undefined) void actor()?.play('jump-hop', { at: x });
  };
  return (
    <Stack gap="md">
      <Flex gap="md" align="center" wrap>
        <SegmentedControl aria-label="Mascot" size="sm" value={who} options={MASCOT_OPTIONS} onChange={setWho} />
        <div className="stage-lab__control"><Slider label="Top speed" size="sm" value={speed} min={40} max={400} step={10} showValue formatValue={(n) => `${n} px a second`} onChange={setSpeed} /></div>
      </Flex>
      <div className="stage-lab__frame stage-lab__frame--follow" onPointerMove={onMove} onPointerLeave={() => void actor()?.play('curious', { loop: 1 })} onPointerUp={onClick} data-testid="follow-frame">
        <MascotStage key={who} ref={stage} cast={[{ id: who, brand: BRAND_OF[who] }]} height={170} label="A mascot following the pointer" />
      </div>
      <Text variant="caption">Hover over the stage and the mascot walks after the pointer; a new target mid-walk keeps its speed. Click to make it hop there.</Text>
    </Stack>
  );
};

export { StageFollow };
