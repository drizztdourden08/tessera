/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';

const clearsOnEscape = (event: KeyboardEvent<HTMLInputElement>, value: string): boolean =>
  event.key === 'Escape' && !event.defaultPrevented && value !== '';

export { clearsOnEscape };
