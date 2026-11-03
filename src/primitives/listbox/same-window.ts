/* @layer renderer-components @kind util */
import type { ListboxWindow } from './listbox-window.type';

const sameWindow = (a: ListboxWindow, b: ListboxWindow): boolean =>
  a.rowSize === b.rowSize
  && a.ranges.length === b.ranges.length
  && a.ranges.every((range, at) => range.start === b.ranges[at]?.start && range.end === b.ranges[at].end);

export { sameWindow };
