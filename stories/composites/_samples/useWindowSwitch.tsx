/* @layer stories @kind hook */
import { useState } from 'react';
import { FloatingSwitch } from '../../../src/composites';
import { LAYER_WINDOWS } from './layer-windows';

const useWindowSwitch = (on: boolean) => {
  const [view, setView] = useState('sessions');
  const floating = on ? <FloatingSwitch items={LAYER_WINDOWS} activeId={view} onSelect={setView} label="Switch window" /> : undefined;
  return { view, floating };
};

export { useWindowSwitch };
