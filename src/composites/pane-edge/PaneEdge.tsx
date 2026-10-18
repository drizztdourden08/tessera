/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeHandle } from '../ResizeHandle/ResizeHandle';
import { edgeLabelOf } from './edge-label-of';
import { EdgeToggle } from './EdgeToggle';
import type { PaneEdgeProps } from './pane-edge.type';
import './PaneEdge.css';

const PaneEdge = (props: PaneEdgeProps) => {
  const { handle, start, end, orientation = 'horizontal', className } = props;
  const { navigation } = useTesseraStrings();
  const sized = handle.edge === 'end' ? end : start;
  const classes = ['pane-edge', `pane-edge--${orientation}`, className].filter(Boolean).join(' ');
  return (
    <Box className={classes}>
      <EdgeToggle pane={end} side="end" across={start} />
      <ResizeHandle
        {...handle}
        orientation={orientation}
        label={edgeLabelOf(start, end, { both: navigation.resizePanes, one: navigation.resizePane })}
        title={navigation.resizeHint}
        controls={sized?.id}
      />
      <EdgeToggle pane={start} side="start" across={end} />
    </Box>
  );
};

export { PaneEdge };
