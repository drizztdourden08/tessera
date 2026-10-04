/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { MascotStage } from '../../../../src/brand';
import type { MascotClip, MascotStageCast, MascotStageHandle } from '../../../../src/brand';
import { Button, Flex, Slider, Stack, Text, Toggle } from '../../../../src/primitives';
import { STAGE_MASCOTS } from './stage-mascots.constants';

const HELD: readonly MascotClip[] = ['idle-bounce', 'working', 'link'];
const times = (n: number): string => `${n.toFixed(2)}×`;

/** The whole stage faster or slower, paused, and one clip at its own speed on top. */
const StageSpeed = () => {
  const stage = useRef<MascotStageHandle>(null);
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [clipSpeed, setClipSpeed] = useState(0.5);
  const cast = useMemo<MascotStageCast[]>(() => STAGE_MASCOTS.map((m, i) => ({ id: m.key, brand: m.brand, rest: HELD[i] ?? 'idle' })), []);
  const spinAll = () => {
    for (const m of STAGE_MASCOTS) void stage.current?.actor(m.key)?.play('spin', { speed: clipSpeed });
  };
  return (
    <Stack gap="md">
      <Flex gap="md" align="end" wrap>
        <div className="stage-lab__control"><Slider label="Stage speed" size="sm" value={speed} min={0.1} max={3} step={0.05} showValue formatValue={times} onChange={setSpeed} /></div>
        <Toggle size="sm" checked={playing} onChange={setPlaying} label="Playing" />
        <div className="stage-lab__control"><Slider label="Spin speed" size="sm" value={clipSpeed} min={0.1} max={3} step={0.05} showValue formatValue={times} onChange={setClipSpeed} /></div>
        <Button size="sm" onClick={spinAll}>Spin at that speed</Button>
      </Flex>
      <div className="stage-lab__frame stage-lab__frame--plain">
        <MascotStage ref={stage} cast={cast} height={170} speed={speed} playing={playing} label="Mascots at a chosen speed" />
      </div>
      <Text variant="caption">Stage speed scales everything, walks and blends included. A clip's own speed multiplies on top, for that clip only.</Text>
    </Stack>
  );
};

export { StageSpeed };
