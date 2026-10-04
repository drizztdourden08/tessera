/* @layer stories @kind component */
import { useState } from 'react';
import { MASCOT_CLIPS } from '../../../src/brand';
import type { MascotClip } from '../../../src/brand';
import { Box, Button, Flex, SegmentedControl, Select, Slider } from '../../../src/primitives';
import type { ScriptStep } from './director-presets.constants';

type Kind = ScriptStep['kind'];

const KINDS = [{ value: 'walk', label: 'Walk to x' }, { value: 'play', label: 'Play clip' }, { value: 'face', label: 'Face' }, { value: 'wait', label: 'Wait' }] as const;
const CLIP_OPTIONS = MASCOT_CLIPS.map((c) => ({ value: c, label: c }));
const FACES = [{ value: 'left', label: 'left' }, { value: 'right', label: 'right' }] as const;

const DirectorStepEditor = (props: { onAdd: (step: ScriptStep) => void }) => {
  const [kind, setKind] = useState<Kind>('play');
  const [clip, setClip] = useState<MascotClip>('wave');
  const [x, setX] = useState(50);
  const [loops, setLoops] = useState(1);
  const [ms, setMs] = useState(600);
  const [face, setFace] = useState<'left' | 'right'>('left');
  const steps: Record<Kind, ScriptStep> = { walk: { kind: 'walk', x }, play: { kind: 'play', clip, loops }, face: { kind: 'face', face }, wait: { kind: 'wait', ms } };
  return (
    <Flex gap="sm" align="end" wrap>
      <SegmentedControl label="Step" size="sm" value={kind} options={[...KINDS]} onChange={setKind} />
      {kind === 'walk' && <Box className="stage-lab__control"><Slider label="x" size="sm" value={x} min={0} max={100} showValue formatValue={(n) => `${n} percent`} onChange={setX} /></Box>}
      {kind === 'play' && <Box className="stage-lab__control"><Select aria-label="Clip" size="sm" value={clip} options={CLIP_OPTIONS} onChange={(v) => setClip(v as MascotClip)} searchable /></Box>}
      {kind === 'play' && <Box className="stage-lab__control"><Slider label="Times" size="sm" value={loops} min={1} max={5} showValue onChange={setLoops} /></Box>}
      {kind === 'face' && <SegmentedControl aria-label="Face" size="sm" value={face} options={[...FACES]} onChange={setFace} />}
      {kind === 'wait' && <Box className="stage-lab__control"><Slider label="Wait" size="sm" value={ms} min={100} max={3000} step={100} showValue formatValue={(n) => `${n} ms`} onChange={setMs} /></Box>}
      <Button size="sm" variant="secondary" onClick={() => props.onAdd(steps[kind])}>Add step</Button>
    </Flex>
  );
};

export { DirectorStepEditor };
