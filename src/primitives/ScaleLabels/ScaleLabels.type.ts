/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ScaleLabelEntry = readonly [value: number, label: ReactNode];

type ScaleLabelSource = string | readonly ScaleLabelEntry[] | ((value: number) => ReactNode);

type ScaleOrientation = 'horizontal' | 'vertical';

interface ScaleLabel {
  value: number;
  label: ReactNode;
}

interface ScaleLabelsProps {
  min: number;
  max: number;
  step?: number;
  stops?: readonly string[];
  formatValue?: (value: number) => string;
  labels?: ScaleLabelSource;
  orientation?: ScaleOrientation;
  thin?: boolean;
  ticks?: boolean;
  highlight?: readonly [number, number];
  className?: string;
}

export type { ScaleLabel, ScaleLabelEntry, ScaleLabelSource, ScaleLabelsProps, ScaleOrientation };
