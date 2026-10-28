/* @layer renderer-components @kind logic */
import { TYPE_AHEAD_RESET } from './selection.constants';
import { typeAheadIndex } from './type-ahead-index';
import type { KeyboardEvent } from 'react';
import type { TypeAheadKeyInput } from './selection-ops.type';

const typeAheadKey = (input: TypeAheadKeyInput, event: KeyboardEvent<HTMLElement>, key: string): void => {
  const { usable, labelOf, onFocusKey, typed } = input;
  const fresh = event.timeStamp - typed.current.at > TYPE_AHEAD_RESET;
  const text = fresh ? event.key : typed.current.text + event.key;
  typed.current = { text, at: event.timeStamp };
  const index = typeAheadIndex({ count: usable.length, from: usable.indexOf(key), text, labelAt: (at) => labelOf(usable[at] ?? '') });
  const found = usable[index];
  if (found === undefined) return;
  event.preventDefault();
  onFocusKey(found);
};

export { typeAheadKey };
