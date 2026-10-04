/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { barTemplate } from '../behavior/bar-template';
import { FREE_ID } from '../StackedBar.constants';
import { StackedBarPiece } from './StackedBarPiece';
import type { StackedBarTrackProps } from './StackedBarTrack.type';

const StackedBarTrack = (props: StackedBarTrackProps) => {
  const { rows, sizes, orientation, freeTip, summary } = props;
  const pieces = rows.map((row) => <StackedBarPiece key={row.id} color={row.color} tip={row.tip} />);
  if (freeTip) pieces.push(<StackedBarPiece key={FREE_ID} color="free" tip={freeTip} />);
  return (
    <Box
      className="stacked-bar__bar"
      style={barTemplate(sizes, orientation)}
      role={summary ? 'img' : undefined}
      aria-label={summary}
      aria-hidden={summary ? undefined : true}
    >
      {orientation === 'vertical' ? pieces.reverse() : pieces}
    </Box>
  );
};

export { StackedBarTrack };
