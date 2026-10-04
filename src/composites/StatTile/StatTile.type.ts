/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StatusTone } from '../../primitives/Status/Status.type';

type StatTrend = 'up' | 'down' | 'flat';

type StatTrendMeaning = 'good' | 'bad' | 'neutral';

type StatTileChartPlacement = 'below' | 'beside';

type StatTileSize = 'sm' | 'md' | 'lg';

interface StatTileProps {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  tone?: StatusTone;
  delta?: ReactNode;
  trend?: StatTrend;
  upIs?: StatTrendMeaning;
  deltaTone?: StatusTone;
  chart?: ReactNode;
  chartPlacement?: StatTileChartPlacement;
  size?: StatTileSize;
  className?: string;
}

export type { StatTileChartPlacement, StatTileProps, StatTileSize, StatTrend, StatTrendMeaning };
