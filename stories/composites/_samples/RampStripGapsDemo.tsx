/* @layer stories @kind component */
import { useState } from 'react';
import { RampStrip } from '../../../src/composites';
import type { RampStep } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { BLUES } from './ramp-steps';

type RampStripGapsDemoProps = {
  multi?: boolean;
  marked?: boolean;
  menu?: boolean;
  drag?: boolean;
};

const MARKED: readonly RampStep[] = BLUES.map((step, index) => (index % 3 === 0 ? { ...step, marks: { 'top-end': '*' } } : step));

const RampStripGapsDemo = ({ multi = false, marked = false, menu = false, drag = false }: RampStripGapsDemoProps) => {
  const [value, setValue] = useState<number | null>(2);
  const [selected, setSelected] = useState<ReadonlySet<number>>(new Set([2]));
  const [note, setNote] = useState('Click a step. Shift extends, Ctrl or Command toggles.');
  const picked = [...selected].map((index) => index + 1).join(', ');

  return (
    <Box className="story-column">
      <RampStrip
        aria-label="Blue ramp"
        steps={marked ? MARKED : BLUES}
        value={value}
        onChange={setValue}
        selected={multi ? selected : undefined}
        onSelectionChange={multi ? setSelected : undefined}
        onSwatchDragStart={drag ? (index, event) => { event.dataTransfer.setData('text/plain', String(index + 1)); setNote(`Dragging step ${index + 1}`); } : undefined}
        swatchMenu={menu ? (index) => [{ id: 'use', label: `Use step ${index + 1}`, onSelect: () => setNote(`Used step ${index + 1}`) }] : undefined}
        size="md"
        numbered
      />
      <Text className="story-label">{multi ? `Picked: ${picked}` : note}</Text>
      {multi && <Text className="story-label">{note}</Text>}
    </Box>
  );
};

export { RampStripGapsDemo };
