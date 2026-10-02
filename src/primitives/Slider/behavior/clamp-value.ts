/* @layer renderer-components @kind util */
import { roundValue } from '../../value-rule/round-value';
import type { ValueScale } from '../../value-rule/value-rule.type';

const clampValue = (value: number, scale: ValueScale): number => roundValue(Math.min(scale.max, Math.max(scale.min, value)));

export { clampValue };
