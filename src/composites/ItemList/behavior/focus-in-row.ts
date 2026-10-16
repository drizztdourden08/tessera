/* @layer renderer-components @kind util */
import { rowElement } from './row-element';

const focusInRow = (list: HTMLElement | null, id: string, selector: string): void => {
  requestAnimationFrame(() => rowElement(list, id)?.querySelector<HTMLElement>(selector)?.focus());
};

export { focusInRow };
