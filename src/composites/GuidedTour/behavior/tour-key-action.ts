/* @layer renderer-components @kind logic */
import { TOUR_KEYS } from '../GuidedTour.constants';
import type { TourKeyAction, TourKeyContext } from './tour-internal.type';

const tourKeyAction = (key: string, context: TourKeyContext): TourKeyAction | null => {
  const binding = TOUR_KEYS.find((entry) => entry.key === key);
  if (!binding || context.modified) return null;
  if (binding.action === 'close') return 'close';
  if (context.editable || (key === 'Enter' && context.interactive)) return null;
  if (binding.action === 'next' && context.waits) return null;
  return binding.action;
};

export { tourKeyAction };
