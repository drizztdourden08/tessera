/* @layer renderer-components @kind logic */
import { selectionAction } from './selection-action';
import { EMPTY, TYPE_AHEAD_RESET } from './selection.constants';
import { typeAheadKey } from './type-ahead-key';
import type { KeyboardEvent } from 'react';
import type { SelectionKeyInput } from './selection-key-down.type';
import type { SelectionAction } from './selection.type';

const isTyping = (input: SelectionKeyInput, event: KeyboardEvent<HTMLElement>): boolean =>
  event.key === ' ' && input.labelOf !== undefined && input.typed.current.text !== '' && event.timeStamp - input.typed.current.at <= TYPE_AHEAD_RESET;

const run = (input: SelectionKeyInput, action: Exclude<SelectionAction, 'type'>, key: string): void => {
  if (action === 'clear') input.onChange(EMPTY);
  else if (action === 'all') input.onChange(new Set(input.usable));
  else if (action === 'toggle') input.ops.toggle(key);
  else input.ops.step(key, key, false);
};

const selectionKeyDown = (input: SelectionKeyInput) => (event: KeyboardEvent<HTMLElement>, key: string): void => {
  const { usable, labelOf, onFocusKey, typed } = input;
  if (event.target !== event.currentTarget) return;
  const action = isTyping(input, event) ? 'type' : selectionAction(event);
  if (action === undefined || (action === 'clear' && input.selected.size === 0)) return;
  if (action === 'type') {
    if (labelOf && onFocusKey) typeAheadKey({ usable, labelOf, onFocusKey, typed }, event, key);
    return;
  }
  event.preventDefault();
  run(input, action, key);
};

export { selectionKeyDown };
