/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import type { CommandSpecKeyAction } from '../CommandInput.type';

const specKey = (event: KeyboardEvent<HTMLElement>, blank: boolean, ready: boolean): CommandSpecKeyAction => {
  if (event.defaultPrevented || event.nativeEvent.isComposing) return null;
  if (!event.currentTarget.contains(event.target as Node)) return null;
  if (event.key === 'Escape' && blank) return 'clear';
  if (event.key === 'Enter' && ready && !(event.target instanceof HTMLButtonElement)) return 'send';
  return null;
};

export { specKey };
