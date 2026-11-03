/* @layer renderer-components @kind logic */
import { isPickKey } from './is-pick-key';
import type { KeyboardEvent } from 'react';
import type { ListKeyDownInput } from './list-key-down.type';

const listKeyDown = (input: ListKeyDownInput) => (event: KeyboardEvent<HTMLElement>): void => {
  const { model, index, itemKey, ownsKey, onPick } = input;
  if (ownsKey?.(event) || model.moving.keyMove(event, index)) return;
  if (onPick && event.target === event.currentTarget && isPickKey(event.key, model.selecting)) {
    event.preventDefault();
    onPick(index, event);
    return;
  }
  if (model.selecting) model.select.onKeyDown(event, itemKey);
  model.navigate(event, index);
};

export { listKeyDown };
