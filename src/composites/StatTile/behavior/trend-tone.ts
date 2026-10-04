/* @layer renderer-components @kind logic */
import type { StatusTone } from '../../../primitives/Status/Status.type';
import type { StatTrend, StatTrendMeaning } from '../StatTile.type';

const trendTone = (trend: StatTrend | undefined, upIs: StatTrendMeaning): StatusTone => {
  if (!trend || trend === 'flat' || upIs === 'neutral') return 'neutral';
  const good = (trend === 'up') === (upIs === 'good');
  return good ? 'success' : 'danger';
};

export { trendTone };
