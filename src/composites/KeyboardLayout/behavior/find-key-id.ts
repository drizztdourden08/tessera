/* @layer renderer-components @kind util */
import { keyboardGeometry } from './keyboard-geometry';
import { normalizeTarget } from './normalize-target';
import type { KeyboardSize, KeyboardTarget } from '../KeyboardLayout.type';

const findKeyId = (target: string, size: KeyboardSize): KeyboardTarget | undefined => {
  const name = normalizeTarget(target);
  return keyboardGeometry(size).keys.find((key) => key.names.includes(name))?.id;
};

export { findKeyId };
