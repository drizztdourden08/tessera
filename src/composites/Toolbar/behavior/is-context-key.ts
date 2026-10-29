/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';

const isContextKey = (event: KeyboardEvent<HTMLElement>): boolean => event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey);

export { isContextKey };
