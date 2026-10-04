/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import type { StatTileReadingProps } from './StatTileReading.type';

const StatTileReading = (props: StatTileReadingProps) => {
  const { value, unit, tone } = props;
  return (
    <Box className="stat-tile__reading">
      <Span className="stat-tile__value" data-tone={tone}>{value}</Span>
      {unit !== undefined && <Span className="stat-tile__unit">{unit}</Span>}
    </Box>
  );
};

export { StatTileReading };
