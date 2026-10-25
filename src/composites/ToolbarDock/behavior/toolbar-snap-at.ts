/* @layer renderer-components @kind logic */
import { TOOLBAR_SNAP_PX } from '../ToolbarDock.constants';
import type { ToolbarPlace } from '../ToolbarDock.type';

const toolbarSnapAt = (places: readonly ToolbarPlace[], span: number, raw: number): number => {
  const at = Math.min(Math.max(raw, 0), 1);
  if (!(span > 0)) return at;
  const targets = [0, 1, ...places.flatMap((place) => [place.start, place.start + place.size])];
  let best = at;
  let gap = TOOLBAR_SNAP_PX / span;
  for (const target of targets) {
    const distance = Math.abs(target - at);
    if (distance <= gap) {
      best = target;
      gap = distance;
    }
  }
  return best;
};

export { toolbarSnapAt };
