/* @layer stories @kind component */
import { useState } from 'react';
import { Slider } from '../../../src/primitives';

const percent = (value: number): string => `${value}%`;

const HintCostSlider = (props: { disabled: boolean }) => {
  const { disabled } = props;
  const [value, setValue] = useState(60);
  return <Slider value={value} min={0} max={100} step={5} onChange={setValue} label="Hint cost" formatValue={percent} labels="every 25" disabled={disabled} />;
};

export { HintCostSlider };
