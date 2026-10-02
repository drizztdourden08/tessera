/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ScaleLabelSource } from '../../ScaleLabels/ScaleLabels.type';
import type { ValueScale } from '../../value-rule/value-rule.type';
import type { RailHandlers } from '../behavior/useRangeDrag.type';

interface SliderTrackProps {
  scale: ValueScale;
  labels?: ScaleLabelSource;
  span: readonly [number, number];
  readout: ReactNode;
  range: boolean;
  rail?: RailHandlers;
  children: ReactNode;
}

export type { SliderTrackProps };
