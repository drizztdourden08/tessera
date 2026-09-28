/* @layer renderer-components @kind util */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { FALLBACK_TRAVEL_MS, MS_PER_SECOND } from '../ShortcutTour.constants';

const travelMs = (world: HTMLElement | null): number => {
  if (!world) return FALLBACK_TRAVEL_MS;
  const first = ownerWindowOf(world).getComputedStyle(world).transitionDuration.split(',')[0]?.trim() ?? '';
  const value = Number.parseFloat(first);
  if (!Number.isFinite(value) || value <= 0) return FALLBACK_TRAVEL_MS;
  return first.endsWith('ms') ? value : value * MS_PER_SECOND;
};

export { travelMs };
