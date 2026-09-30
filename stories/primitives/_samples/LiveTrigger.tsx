/* @layer stories @kind component */
import { ProgressBar, Stack, StatRow } from '../../../src/primitives';
import { triggerAt } from '../../composites/_samples/controller-motion';
import { useAnimationTime } from '../../composites/_samples/use-animation-time';

const LiveTrigger = () => {
  const value = triggerAt(useAnimationTime());
  return (
    <Stack gap="xs">
      <StatRow label="Right trigger" value={value.toFixed(2)} mono />
      <ProgressBar value={value} max={1} live />
    </Stack>
  );
};

export { LiveTrigger };
