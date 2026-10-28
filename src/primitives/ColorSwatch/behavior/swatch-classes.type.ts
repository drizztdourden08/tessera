/* @layer renderer-components @kind types */
import type { SwatchFocusRing } from '../ColorSwatch.type';

interface SwatchClassesInput {
  size: string;
  selected: boolean;
  edited: boolean;
  transparent: boolean;
  translucent: boolean;
  unused: boolean;
  mixed: boolean;
  focusRing: SwatchFocusRing;
  className: string;
}

export type { SwatchClassesInput };
