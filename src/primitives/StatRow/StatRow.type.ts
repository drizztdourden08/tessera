/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { GaugeSize } from '../Gauge/Gauge.type';

type StatRowAlign = 'start' | 'end';

interface StatRowProps {
  label: ReactNode;
  value: ReactNode;
  mono?: boolean;
  size?: GaugeSize;
  align?: StatRowAlign;
  className?: string;
}

export type { StatRowAlign, StatRowProps };
