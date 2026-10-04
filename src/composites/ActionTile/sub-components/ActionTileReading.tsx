/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import type { ActionTileReadingProps } from '../ActionTile.type';

const ActionTileReading = (props: ActionTileReadingProps) => {
  const { value, unit, tone } = props;
  return (
    <Box className="action-tile__reading">
      <Span className="action-tile__value" tone={tone === 'neutral' ? 'muted' : tone}>{value}</Span>
      {unit !== undefined && <Span className="action-tile__unit">{unit}</Span>}
    </Box>
  );
};

export { ActionTileReading };
