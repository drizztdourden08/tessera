/* @layer stories @kind component */
import { useState } from 'react';
import { ChoiceGrid } from '../../../src/composites/ChoiceGrid';
import type { ChoiceRole } from '../../../src/composites/ChoiceGrid';
import { Box, Button, ColorSwatch, Text } from '../../../src/primitives';
import { BRUSH_SECTIONS, PALETTE_SECTIONS, RAMP, RAMP_CELLS } from './choice-grid-story.constants';

type ChoiceGridDemoProps = {
  role: ChoiceRole;
  columns: number;
  pickOnRelease: boolean;
};

const RampStrip = ({ role = 'radiogroup' }: { role?: ChoiceRole }) => {
  const [value, setValue] = useState('2');
  return (
    <Box className="story-column">
      <ChoiceGrid
        label="Ramp"
        role={role}
        value={value}
        onChange={setValue}
        cells={RAMP_CELLS}
        renderCell={(cell, state) => (
          <ColorSwatch
            size="sm"
            color={RAMP[Number(cell.value)] ?? '#000000'}
            caption={Number(cell.value) + 1}
            selected={state.selected}
            focusRing="apart"
            {...state.props}
          />
        )}
      />
      <Text className="story-label">Shade {Number(value) + 1}</Text>
    </Box>
  );
};

const BrushPicker = ({ role, columns, pickOnRelease }: ChoiceGridDemoProps) => {
  const [value, setValue] = useState('Round');
  return (
    <Box className="story-column">
      <ChoiceGrid
        label="Brush"
        role={role}
        columns={columns}
        pickOnRelease={pickOnRelease}
        value={value}
        onChange={setValue}
        sections={BRUSH_SECTIONS}
        footer={<Button size="sm" variant="secondary">Add brush</Button>}
      />
      <Text className="story-label">Brush: {value}</Text>
    </Box>
  );
};

const SwatchSections = () => {
  const [value, setValue] = useState('#4870d8');
  return (
    <ChoiceGrid
      label="Palette"
      columns={5}
      value={value}
      onChange={setValue}
      sections={PALETTE_SECTIONS}
      renderCell={(cell, state) => (
        <ColorSwatch size="sm" color={cell.value} selected={state.selected} focusRing="apart" {...state.props} />
      )}
    />
  );
};

export { BrushPicker, RampStrip, SwatchSections };
export type { ChoiceGridDemoProps };
