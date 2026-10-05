/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';

const capsLockOf = (event: Pick<KeyboardEvent, 'getModifierState'>): boolean | null =>
  typeof event.getModifierState === 'function' ? event.getModifierState('CapsLock') : null;

export { capsLockOf };
