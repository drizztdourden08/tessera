/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';

const isUndoKey = (event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey'>): boolean =>
  (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'z';

export { isUndoKey };
