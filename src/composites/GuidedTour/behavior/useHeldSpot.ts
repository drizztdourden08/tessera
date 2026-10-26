/* @layer renderer-components @kind hook */
import { useState } from 'react';
import { MASCOT_STAND_SLACK } from '../GuidedTour.constants';
import { holdSpot } from './hold-spot';
import type { MascotSpot } from './tour-internal.type';

const useHeldSpot = (spot: MascotSpot | null): MascotSpot | null => {
  const [held, setHeld] = useState<MascotSpot | null>(spot);
  const next = holdSpot(held, spot, MASCOT_STAND_SLACK);
  if (next !== held) setHeld(next);
  return next;
};

export { useHeldSpot };
