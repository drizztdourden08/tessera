/* @layer renderer-components @kind util */
import type { KeyRect } from '../KeyboardLayout.type';

const rectOf = (element: HTMLElement): KeyRect => ({
  x: element.offsetLeft,
  y: element.offsetTop,
  width: element.offsetWidth,
  height: element.offsetHeight,
});

export { rectOf };
