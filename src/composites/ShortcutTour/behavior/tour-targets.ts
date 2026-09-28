/* @layer renderer-components @kind util */
import { findKeyId } from '../../KeyboardLayout';
import { MOUSE_TARGET } from '../ShortcutTour.constants';
import type { MouseButton, ShortcutKey } from '../../../primitives';
import type { KeyboardSize, KeyboardTarget } from '../../KeyboardLayout';
import type { TourTarget } from '../ShortcutTour.type';

const tourTargets = (keys: readonly ShortcutKey[], mouse: MouseButton | undefined, size: KeyboardSize): TourTarget[] => {
  const ids = keys.map((key) => findKeyId(key, size)).filter((id): id is KeyboardTarget => id !== undefined);
  return mouse ? [...ids, MOUSE_TARGET] : ids;
};

export { tourTargets };
