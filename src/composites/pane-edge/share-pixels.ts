/* @layer renderer-components @kind logic */
import type { SplitOrientation } from '../SplitPane/SplitPane.type';

const extentOf = (element: Element | undefined, orientation: SplitOrientation): number => {
  const box = element?.getBoundingClientRect();
  if (!box) return 0;
  return orientation === 'horizontal' ? box.width : box.height;
};

const sharePixels = (panes: HTMLElement | null, orientation: SplitOrientation): number => {
  if (!panes) return 0;
  const [first, , last] = panes.children;
  return (extentOf(first, orientation) + extentOf(last, orientation)) / 100;
};

export { sharePixels };
