/* @layer renderer-components @kind logic */
import type { ShortcutListItem } from '../../ShortcutList/ShortcutList.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import { TOUR_KEYS } from '../GuidedTour.constants';
import type { TourKeyAction } from './tour-internal.type';

const tourShortcuts = (tour: TesseraStrings['tour']): ShortcutListItem[] => {
  const words: Record<TourKeyAction, string> = { next: tour.nextKey, back: tour.backKey, close: tour.closeTour };
  return TOUR_KEYS.map((binding) => ({ keys: binding.keys, description: words[binding.action] }));
};

export { tourShortcuts };
