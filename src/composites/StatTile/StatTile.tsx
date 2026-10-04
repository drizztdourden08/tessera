/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Span } from '../../primitives/text-elements';
import { trendTone } from './behavior/trend-tone';
import { StatTileDelta } from './sub-components/StatTileDelta';
import { StatTileReading } from './sub-components/StatTileReading';
import type { StatTileProps } from './StatTile.type';
import './StatTile.css';

const StatTile = (props: StatTileProps) => {
  const {
    label, value, unit, tone, delta, trend, upIs = 'good', deltaTone, chart, chartPlacement = 'below', size = 'md', className,
  } = props;
  const hasDelta = delta !== undefined || trend !== undefined;

  return (
    <Box className={className ? `stat-tile ${className}` : 'stat-tile'} data-chart={chart ? chartPlacement : undefined} data-size={size}>
      <Box className="stat-tile__body">
        <Span className="stat-tile__label">{label}</Span>
        <StatTileReading value={value} unit={unit} tone={tone} />
        {hasDelta && <StatTileDelta delta={delta} trend={trend} tone={deltaTone ?? trendTone(trend, upIs)} />}
      </Box>
      {chart && <Box className="stat-tile__chart">{chart}</Box>}
    </Box>
  );
};

export { StatTile };
