/* @layer stories @kind story */
import { SpanBar, SpanLane } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { UNIFORM_CELLS } from './cell-demo';

const SpanBarTinted = () => (
  <Box className="story-column">
    <SpanLane cells={UNIFORM_CELLS} label="Frames, one tab stop">
      <SpanBar start={0} end={2} cells={UNIFORM_CELLS} label="Idle" tint="--c-tag-teal" data={{ 'data-span': 'idle' }}>Idle</SpanBar>
      <SpanBar start={3} end={5} cells={UNIFORM_CELLS} label="Run" tint="var(--c-primary)" data={{ 'data-span': 'run' }}>Run</SpanBar>
      <SpanBar start={6} end={8} cells={UNIFORM_CELLS} label="Jump" tint="--c-tag-violet" readOnly>Jump</SpanBar>
    </SpanLane>
  </Box>
);

export { SpanBarTinted };
