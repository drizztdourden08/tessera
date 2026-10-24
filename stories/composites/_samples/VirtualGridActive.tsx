/* @layer stories @kind component */
import { useState } from 'react';
import { ValueReadout } from '../../_template/ValueReadout';
import { VirtualGridFrame } from './VirtualGridFrame';

const VirtualGridActive = () => {
  const [active, setActive] = useState(0);
  return (
    <ValueReadout value={`tile ${active + 1}`}>
      <VirtualGridFrame count={2000} onActiveChange={setActive} />
    </ValueReadout>
  );
};

export { VirtualGridActive };
