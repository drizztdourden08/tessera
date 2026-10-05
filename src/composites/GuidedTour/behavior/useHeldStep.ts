/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { GuidedTourApi } from '../GuidedTour.type';
import type { EnteredStep } from './tour-internal.type';

const useHeldStep = (tour: GuidedTourApi): EnteredStep | null => {
  const [held, setHeld] = useState<EnteredStep | null>(null);
  const { shown, index, target } = tour;
  const id = tour.current?.id ?? '';
  if (shown && (held?.index !== index || held.id !== id || held.target !== target)) setHeld({ index, id, target });
  return shown ? { index, id, target } : held;
};

export { useHeldStep };
