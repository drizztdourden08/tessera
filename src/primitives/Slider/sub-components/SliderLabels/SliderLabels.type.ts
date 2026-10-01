/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SliderScale } from '../../behavior/slider-scale.type';

interface SliderLabelPoint {
  value: number;
  label: ReactNode;
}

interface SliderLabelsProps {
  points: readonly SliderLabelPoint[];
  scale: SliderScale;
  span: readonly [number, number];
}

export type { SliderLabelPoint, SliderLabelsProps };
