/* @layer renderer-components @kind logic */
import type { TourStep } from '../GuidedTour.type';
import type { EnteredStep, EntryState } from './tour-internal.type';

const entryState = (entered: EnteredStep | null, index: number, current: TourStep | null): EntryState => {
  if (!current) return { entering: false, shown: false, target: null };
  const shown = entered !== null && entered.index === index && entered.id === current.id;
  return { entering: !shown, shown, target: shown ? entered.target : null };
};

export { entryState };
