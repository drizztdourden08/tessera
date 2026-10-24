/* @layer stories @kind component */
import { useState } from 'react';
import { ValueReadout } from '../../_template/ValueReadout';
import { VirtualListFrame } from './VirtualListFrame';

const VirtualListActive = () => {
  const [active, setActive] = useState(0);
  return (
    <ValueReadout value={`row ${active + 1}`}>
      <VirtualListFrame count={5000} onActiveChange={setActive} />
    </ValueReadout>
  );
};

export { VirtualListActive };
