/* @layer renderer-components @kind util */
import type { Zoomed } from './css-zoom-of.type';

const cssZoomOf = (element: HTMLElement): number => {
  const zoom = (element as Zoomed).currentCSSZoom;
  return typeof zoom === 'number' && zoom > 0 ? zoom : 1;
};

export { cssZoomOf };
