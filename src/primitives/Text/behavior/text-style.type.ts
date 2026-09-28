/* @layer renderer-components @kind types */
import type { TypeFeature } from '../../type-features/type-features.type';

type OpticalSize = 'auto' | 'text' | 'display' | number;

interface Typesetting {
  weight?: number;
  italic?: boolean;
  opticalSize?: OpticalSize;
  features?: readonly TypeFeature[];
}

export type { OpticalSize, Typesetting };
