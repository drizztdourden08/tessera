/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import type { ListKeyDownInput } from './list-key-down.type';

const listKeyDown = (input: ListKeyDownInput) => (event: KeyboardEvent<HTMLElement>): void => {
  const { model, index, itemKey, ownsKey } = input;
  if (ownsKey?.(event) || model.moving.keyMove(event, index)) return;
  if (model.selecting) model.select.onKeyDown(event, itemKey);
  model.navigate(event, index);
};

export { listKeyDown };
