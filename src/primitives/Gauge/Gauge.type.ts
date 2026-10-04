/* @layer renderer-components @kind types */
import type { StatusTone } from '../Status/Status.type';

type GaugeSize = 'sm' | 'md' | 'lg';

type GaugeLevel = 'success' | 'warning' | 'danger';

interface GaugeThresholds {
  warning: number;
  danger: number;
}

interface GaugeZone {
  tone: GaugeLevel;
  start: number;
  length: number;
}

interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  thresholds?: GaugeThresholds;
  tone?: StatusTone;
  unit?: string;
  label?: string;
  size?: GaugeSize;
  zones?: boolean;
  format?: (value: number) => string;
  className?: string;
}

export type { GaugeLevel, GaugeProps, GaugeSize, GaugeThresholds, GaugeZone };
