/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Slider } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { BALANCING } from './option-samples.constants';

const named = (value: number): string => {
  const name = BALANCING.find(([at]) => at === value)?.[1];
  return typeof name === 'string' ? name : String(value);
};

const BalancingSlider = ({ start, names = false }: { start: number; names?: boolean }) => {
  const [value, setValue] = useState(start);
  return (
    <Box className="slider-stage">
      <ValueReadout value={value}>
        <Slider
          value={value} onChange={setValue} min={0} max={99} labels={BALANCING} input={!names} formatValue={names ? named : undefined}
          aria-label="Progression balancing"
        />
      </ValueReadout>
    </Box>
  );
};

export { BalancingSlider };
