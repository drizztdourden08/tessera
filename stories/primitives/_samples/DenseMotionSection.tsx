/* @layer stories @kind component */
import { useState } from 'react';
import { DisabledOverlay } from '../../../src/composites';
import { Box, Field, SegmentedControl, Slider } from '../../../src/primitives';
import { LOOPS } from './dense-editor.constants';

const DenseMotionSection = () => {
  const [at, setAt] = useState(40);
  const [loop, setLoop] = useState('once');
  return (
    <DisabledOverlay active contained message="A node inside a grid takes its motion from the grid.">
      <Box className="dense-editor__motion">
        <Field label="Start at">
          <Slider value={at} min={0} max={100} onChange={setAt} formatValue={(value) => `${value}%`} />
        </Field>
        <SegmentedControl aria-label="Loop" value={loop} options={LOOPS} onChange={setLoop} />
      </Box>
    </DisabledOverlay>
  );
};

export { DenseMotionSection };
