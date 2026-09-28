/* @layer renderer-components @kind util */
import { KEYBOARD_KEYS, SIZE_ZONES } from '../KeyboardLayout.constants';
import type { KeyboardGeometry, KeyboardSize } from '../KeyboardLayout.type';

const keyboardGeometry = (size: KeyboardSize): KeyboardGeometry => {
  const zones = SIZE_ZONES[size];
  const keys = KEYBOARD_KEYS.filter((key) => zones.includes(key.zone));
  const columns = Math.max(...keys.map((key) => key.x + key.w));
  const rows = Math.max(...keys.map((key) => key.y + key.h));
  return { keys, columns, rows };
};

export { keyboardGeometry };
