/* @layer renderer-components @kind component */
import { Badge } from '../../primitives/Badge';
import { Box } from '../../primitives/Box';
import { Floating } from '../../primitives/Floating';
import { Portal } from '../../primitives/Portal';
import { STACK_LIMIT } from './DragGhost.constants';
import type { DragGhostProps } from './DragGhost.type';
import './DragGhost.css';

const DragGhost = (props: DragGhostProps) => {
  const { count, thumbnails = [], point, className } = props;
  if (point === null || count <= 0) return null;
  const shown = thumbnails.slice(0, Math.min(STACK_LIMIT, count));
  const classes = ['drag-ghost', className].filter(Boolean).join(' ');
  const body = (
    <>
      <Box className="drag-ghost__stack">
        {shown.map((thumbnail, at) => (
          <Box key={at} className={`drag-ghost__card drag-ghost__card--${shown.length - 1 - at}`}>
            {thumbnail}
          </Box>
        ))}
      </Box>
      <Badge variant="inline" color="primary" value={count} className="drag-ghost__count" />
    </>
  );
  if (!point) return <Box className={classes} aria-hidden="true">{body}</Box>;
  return (
    <Portal layer="tooltip">
      <Floating placement={{ left: point.x, top: point.y }} className={`${classes} drag-ghost--follow`} aria-hidden="true">{body}</Floating>
    </Portal>
  );
};

export { DragGhost };
