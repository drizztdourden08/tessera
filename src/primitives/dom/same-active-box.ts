/* @layer renderer-components @kind util */
import type { ActiveBox } from './active-box.type';

const sameActiveBox = (a: ActiveBox | null, b: ActiveBox | null): boolean =>
  a === b || (a !== null && b !== null && a.left === b.left && a.start === b.start && a.size === b.size);

export { sameActiveBox };
