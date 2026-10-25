/* @layer renderer-components @kind util */
import { TOGGLES_SELECTOR } from './reorder-item.constants';

const mainOf = (item: HTMLElement | undefined): HTMLElement | null =>
  item?.matches('button') ? item : [...(item?.querySelectorAll<HTMLElement>('button') ?? [])].find((button) => !button.closest(TOGGLES_SELECTOR)) ?? null;

export { mainOf };
