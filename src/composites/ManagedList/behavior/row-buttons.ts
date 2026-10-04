/* @layer renderer-components @kind util */
import { ROW_SELECTOR } from '../ManagedList.constants';

const rowButtons = (list: HTMLElement | null): HTMLElement[] =>
  list ? [...list.querySelectorAll<HTMLElement>(ROW_SELECTOR)] : [];

export { rowButtons };
