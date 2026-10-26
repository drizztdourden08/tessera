/* @layer renderer-components @kind util */
import { reorderStep } from './reorder-step';
import type { KeyboardEvent } from 'react';
import type { GripKeyOptions } from './grip-key-down.type';

const gripKeyDown = (event: KeyboardEvent<HTMLElement>, options: GripKeyOptions): void => {
  const { drag, index, total, onStep } = options;
  if (event.key === 'Escape') drag.cancel();
  const to = reorderStep(event, { axis: 'vertical', chord: 'plain', index, total });
  if (to === undefined) return;
  event.preventDefault();
  onStep(to);
};

export { gripKeyDown };
