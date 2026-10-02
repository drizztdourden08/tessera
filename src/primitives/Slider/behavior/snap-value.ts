/* @layer renderer-components @kind util */
import { clampValue } from './clamp-value';
import type { ValueScale } from '../../value-rule/value-rule.type';

const snapValue = (raw: number, scale: ValueScale): number =>
  clampValue(scale.min + Math.round((raw - scale.min) / scale.step) * scale.step, scale);

export { snapValue };
