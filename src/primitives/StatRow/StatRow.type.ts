/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { GaugeSize } from '../Gauge/Gauge.type';

interface StatRowProps {
  label: ReactNode;
  value: ReactNode;
  mono?: boolean;
  copyable?: boolean | string;
  size?: GaugeSize;
  className?: string;
}

export type { StatRowProps };
