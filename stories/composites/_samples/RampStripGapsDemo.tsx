/* @layer stories @kind component */
import { useState } from 'react';
import { RampStrip } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { dragStart, MARKED, stepMenu } from './ramp-strip-gaps';
import { BLUES } from './ramp-steps';

type RampStripGapsFeature = 'multi' | 'marked' | 'menu' | 'drag';

const RampStripGapsDemo = ({ feature }: { feature: RampStripGapsFeature }) => {
  const [value, setValue] = useState<number | null>(2);
  const [selected, setSelected] = useState<ReadonlySet<number>>(new Set([2]));
  const [note, setNote] = useState('Click a step. Shift extends, Ctrl or Command toggles.');
  const multi = feature === 'multi';
  const picked = [...selected].map((index) => index + 1).join(', ');

  return (
    <Box className="story-column">
      <RampStrip
        aria-label="Blue ramp"
        steps={feature === 'marked' ? MARKED : BLUES}
        value={value}
        onChange={setValue}
        selected={multi ? selected : undefined}
        onSelectionChange={multi ? setSelected : undefined}
        onSwatchDragStart={feature === 'drag' ? dragStart(setNote) : undefined}
        swatchMenu={feature === 'menu' ? stepMenu(setNote) : undefined}
        size="md"
        numbered
      />
      <Text className="story-label">{multi ? `Picked: ${picked}` : note}</Text>
    </Box>
  );
};

export { RampStripGapsDemo };
