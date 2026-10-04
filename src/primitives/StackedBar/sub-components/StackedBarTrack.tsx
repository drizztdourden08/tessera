/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { FREE_ID } from '../StackedBar.constants';
import { StackedBarPiece } from './StackedBarPiece';
import type { StackedBarTrackProps } from './StackedBarTrack.type';

const StackedBarTrack = (props: StackedBarTrackProps) => {
  const { rows, columns, freeTip, summary } = props;
  return (
    <Box
      className="stacked-bar__bar"
      style={{ gridTemplateColumns: columns }}
      role={summary ? 'img' : undefined}
      aria-label={summary}
      aria-hidden={summary ? undefined : true}
    >
      {rows.map((row) => <StackedBarPiece key={row.id} color={row.color} tip={row.tip} />)}
      {freeTip && <StackedBarPiece key={FREE_ID} color="free" tip={freeTip} />}
    </Box>
  );
};

export { StackedBarTrack };
