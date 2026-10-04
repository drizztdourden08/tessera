/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StatusTone } from '../../../primitives/Status/Status.type';
import type { StatTrend } from '../StatTile.type';

interface StatTileDeltaProps {
  delta?: ReactNode;
  trend?: StatTrend;
  tone: StatusTone;
}

export type { StatTileDeltaProps };
