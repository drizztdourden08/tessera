/* @layer renderer-components @kind types */
import type { ValueScale } from '../../value-rule/value-rule.type';

interface SliderPartProps<P> {
  props: P;
  scale: ValueScale;
  disabled: boolean;
  accessibleName?: string;
}

export type { SliderPartProps };
