/* @layer renderer-components @kind types */
import type { StatusTone } from '../Status/Status.type';
import type { TagCategoryColor } from '../Tag/Tag.type';

type SparklineVariant = 'line' | 'area';

type SparklineTone = StatusTone | TagCategoryColor;

interface SparklineBand {
  from: number;
  to?: number;
  tone?: SparklineTone;
}

interface SparklineDomain {
  low: number;
  high: number;
}

interface SparklinePoint {
  x: number;
  y: number;
}

interface SparklineGeometry {
  line: string;
  area: string;
  end: SparklinePoint | null;
}

interface SparklineBandBox {
  top: number;
  bottom: number;
  edges: readonly number[];
}

interface SparklineProps {
  values: readonly number[];
  variant?: SparklineVariant;
  length?: number;
  min?: number;
  max?: number;
  band?: SparklineBand;
  dot?: boolean;
  tone?: SparklineTone;
  width?: number;
  height?: number;
  label?: string;
  format?: (value: number) => string;
  className?: string;
}

export type {
  SparklineBand, SparklineBandBox, SparklineDomain, SparklineGeometry, SparklinePoint, SparklineProps, SparklineTone, SparklineVariant,
};
