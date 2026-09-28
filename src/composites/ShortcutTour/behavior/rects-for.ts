/* @layer renderer-components @kind util */
import { MOUSE_TARGET } from '../ShortcutTour.constants';
import type { KeyRect, KeyRects } from '../../KeyboardLayout';
import type { TourTarget } from '../ShortcutTour.type';

const rectsFor = (targets: readonly TourTarget[], keyRects: KeyRects, mouse: KeyRect | null): KeyRect[] | null => {
  const found = targets
    .map((target) => (target === MOUSE_TARGET ? mouse : keyRects.get(target)) ?? null)
    .filter((rect): rect is KeyRect => rect !== null);
  return found.length > 0 && found.length === targets.length ? found : null;
};

export { rectsFor };
