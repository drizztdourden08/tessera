/* @layer renderer-components @kind types */
import type { ValueScale } from '../../value-rule/value-rule.type';

interface KeyTargetParams {
  key: string;
  value: number;
  scale: ValueScale;
  keyStep?: number;
  ladder?: readonly number[];
}

export type { KeyTargetParams };
