/* @layer renderer-components @kind util */
import { clampNumber } from '../../value-rule/clamp-number';
import { roundValue } from '../../value-rule/round-value';
import type { ValueScale } from '../../value-rule/value-rule.type';

const clampValue = (value: number, scale: ValueScale): number => roundValue(clampNumber(value, scale.min, scale.max));

export { clampValue };
