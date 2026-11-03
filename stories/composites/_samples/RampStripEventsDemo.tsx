/* @layer stories @kind component */
import { useState } from 'react';
import { RampStrip } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { eventProps, NOTES } from './ramp-strip-events';
import type { RampEventsFeature } from './ramp-strip-events';
import { BLUES } from './ramp-steps';

const RampStripEventsDemo = ({ feature }: { feature: RampEventsFeature }) => {
  const [value, setValue] = useState<number | null>(2);
  const [note, setNote] = useState(NOTES[feature]);

  return (
    <Box className="story-column">
      <RampStrip aria-label="Blue ramp" steps={BLUES} value={value} onChange={setValue} size="md" numbered {...eventProps(feature, setNote)} />
      <Text className="story-label">{note}</Text>
    </Box>
  );
};

export { RampStripEventsDemo };
