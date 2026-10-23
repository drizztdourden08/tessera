/* @layer renderer-components @kind util */
import { TOGGLES_SELECTOR } from './reorder-item.constants';

const mainOf = (item: Element | undefined): HTMLElement | null =>
  [...(item?.querySelectorAll<HTMLElement>('button') ?? [])].find((button) => !button.closest(TOGGLES_SELECTOR)) ?? null;

export { mainOf };
