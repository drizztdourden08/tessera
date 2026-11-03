/* @layer renderer-components @kind logic */
import { cssZoomOf } from '../../primitives/dom/css-zoom-of';

const localX = (clientX: number, element: HTMLElement): number =>
  (clientX - element.getBoundingClientRect().left) / cssZoomOf(element);

export { localX };
