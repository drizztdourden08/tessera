/* @layer renderer-components @kind logic */
import type { KeyAction } from './key-action.type';
import type { ResizeOptions } from './resize-options.type';

const runKeyAction = (action: NonNullable<KeyAction>, from: number, options: ResizeOptions): void => {
  if (action.kind === 'reset') options.onReset?.();
  else if (action.kind === 'fold') options.fold?.onFold(action.side);
  else if (action.kind === 'unfold') options.fold?.onUnfold(action.side, action.to);
  else if (action.to !== from) {
    options.onResize(action.to, { from, by: 'key' });
    options.onResizeEnd?.(action.to);
  }
};

export { runKeyAction };
