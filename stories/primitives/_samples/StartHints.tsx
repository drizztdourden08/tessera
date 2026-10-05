/* @layer stories @kind component */
import { useState } from 'react';
import { Combobox } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { HINTED, ITEMS } from './option-samples.constants';

const StartHints = () => {
  const [hints, setHints] = useState<string[]>([...HINTED]);
  return (
    <ValueReadout value={hints}>
      <Combobox items={ITEMS} min={0} max={ITEMS.length} values={hints} onValuesChange={setHints} placeholder="Type an item to hint" aria-label="Start hints" />
    </ValueReadout>
  );
};

export { StartHints };
