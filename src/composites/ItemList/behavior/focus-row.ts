/* @layer renderer-components @kind util */
import { rowButtons } from './row-buttons';

const focusRow = (list: HTMLElement | null, index: number): void => {
  requestAnimationFrame(() => rowButtons(list)[index]?.focus());
};

export { focusRow };
