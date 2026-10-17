/* @layer stories @kind component */
import { useState } from 'react';
import { Flex, Slider } from '../../../src/primitives';

const percent = (value: number): string => `${value}%`;

const UprightSliders = () => {
  const [music, setMusic] = useState(80);
  const [effects, setEffects] = useState(40);
  const [cost, setCost] = useState(25);
  return (
    <Flex gap="xl" align="start">
      <Slider orientation="vertical" value={music} onChange={setMusic} formatValue={percent} aria-label="Music" />
      <Slider orientation="vertical" size="sm" value={effects} onChange={setEffects} formatValue={percent} aria-label="Effects" />
      <Slider orientation="vertical" value={cost} onChange={setCost} step={5} labels="every 25 | {v}%" formatValue={percent} aria-label="Hint cost" />
    </Flex>
  );
};

export { UprightSliders };
