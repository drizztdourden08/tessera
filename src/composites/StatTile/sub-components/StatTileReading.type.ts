/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StatusTone } from '../../../primitives/Status/Status.type';

interface StatTileReadingProps {
  value: ReactNode;
  unit?: ReactNode;
  tone?: StatusTone;
}

export type { StatTileReadingProps };
