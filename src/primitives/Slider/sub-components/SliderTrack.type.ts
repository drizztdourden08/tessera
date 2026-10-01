/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SliderScale } from '../behavior/slider-scale.type';
import type { SliderLabels } from '../Slider.type';

interface SliderTrackProps {
  scale: SliderScale;
  labels?: SliderLabels;
  span: readonly [number, number];
  readout: ReactNode;
  before?: ReactNode;
  children: ReactNode;
  onTrackPick?: (fraction: number) => void;
}

export type { SliderTrackProps };
