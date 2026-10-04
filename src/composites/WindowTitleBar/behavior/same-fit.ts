/* @layer renderer-components @kind logic */
import type { BarFit } from './bar-fit.type';

const sameFit = (a: BarFit, b: BarFit): boolean =>
  a.brand === b.brand && a.hidden.length === b.hidden.length && a.hidden.every((id, index) => b.hidden[index] === id);

export { sameFit };
