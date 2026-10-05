/* @layer renderer-components @kind util */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
const clampIndex = (index: number, total: number): number => clampNumber(Math.trunc(index), 0, Math.max(0, total - 1));

export { clampIndex };
