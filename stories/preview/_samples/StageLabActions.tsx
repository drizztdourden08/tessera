/* @layer stories @kind component */
import { MASCOT_CLIPS } from '../../../src/brand';
import type { MascotClip } from '../../../src/brand';
import type { MascotActorHandle } from '../MascotStage';
import { Box, Button, Flex, Select } from '../../../src/primitives';

interface StageLabActionsProps {
  actor: () => MascotActorHandle | undefined;
  clip: MascotClip;
  onClip: (clip: MascotClip) => void;
}

const CLIP_OPTIONS = MASCOT_CLIPS.map((c) => ({ value: c, label: c }));

const StageLabActions = (props: StageLabActionsProps) => {
  const { actor, clip, onClip } = props;
  const interrupt = () => {
    void actor()?.play('spin');
    window.setTimeout(() => void actor()?.play('alert-exclaim'), 700);
  };
  return (
    <Flex gap="sm" align="center" wrap>
      <Box className="stage-lab__control"><Select aria-label="Clip" size="sm" value={clip} options={CLIP_OPTIONS} onChange={(v) => onClip(v as MascotClip)} searchable /></Box>
      <Button size="sm" onClick={() => void actor()?.play(clip)}>Play now</Button>
      <Button size="sm" variant="secondary" onClick={() => void actor()?.play(clip, { loop: true })}>Hold it</Button>
      <Button size="sm" variant="secondary" onClick={() => void actor()?.queue([{ play: clip }])}>Queue</Button>
      <Button size="sm" variant="secondary" onClick={interrupt}>Spin, then alert mid-spin</Button>
      <Button size="sm" variant="secondary" onClick={() => void actor()?.face('left')}>Face left</Button>
      <Button size="sm" variant="secondary" onClick={() => void actor()?.face('right')}>Face right</Button>
      <Button size="sm" variant="secondary" onClick={() => void actor()?.play('working', { at: 60, face: 'right', loop: 3 })}>Work at the left edge</Button>
      <Button size="sm" variant="secondary" onClick={() => actor()?.effect('laptop', 'show')}>Show laptop</Button>
      <Button size="sm" variant="secondary" onClick={() => actor()?.effect('laptop', 'auto')}>Laptop to auto</Button>
      <Button size="sm" variant="secondary" onClick={() => actor()?.stop()}>Stop</Button>
    </Flex>
  );
};

export { StageLabActions };
