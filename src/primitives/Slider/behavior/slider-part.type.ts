/* @layer renderer-components @kind types */
import type { SliderScale } from './slider-scale.type';

interface SliderPartProps<P> {
  props: P;
  scale: SliderScale;
  disabled: boolean;
  accessibleName?: string;
}

export type { SliderPartProps };
