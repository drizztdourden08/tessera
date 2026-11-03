/* @layer stories @kind component */
import { useState } from 'react';
import { Slider } from '../../../src/primitives';

const SliderWithInput = () => {
  const [value, setValue] = useState(10);
  return <Slider value={value} min={0} max={100} step={1} onChange={setValue} label="Hint cost" description="Percent of a player's checks" input labels="every 25" />;
};

export { SliderWithInput };
