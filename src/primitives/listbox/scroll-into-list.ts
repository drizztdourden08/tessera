/* @layer renderer-components @kind util */
import { cssZoomOf } from '../dom/css-zoom-of';

const scrollIntoList = (root: HTMLElement, index: number): void => {
  const option = root.querySelector(`[data-index="${index}"]`);
  const scroller = option?.closest<HTMLElement>('.scroll-area');
  if (!option || !scroller) return;
  const zoom = cssZoomOf(scroller);
  const header = scroller.querySelector('.listbox-header')?.getBoundingClientRect().height ?? 0;
  const view = scroller.getBoundingClientRect();
  const row = option.getBoundingClientRect();
  if (row.top < view.top + header) scroller.scrollTop -= (view.top + header - row.top) / zoom;
  else if (row.bottom > view.bottom) scroller.scrollTop += (row.bottom - view.bottom) / zoom;
};

export { scrollIntoList };
