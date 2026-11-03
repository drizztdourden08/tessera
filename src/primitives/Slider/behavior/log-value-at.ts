/* @layer renderer-components @kind util */
import type { ValueScale } from '../../value-rule/value-rule.type';

const logValueAt = (fraction: number, scale: ValueScale): number => scale.min * (scale.max / scale.min) ** fraction;

export { logValueAt };
