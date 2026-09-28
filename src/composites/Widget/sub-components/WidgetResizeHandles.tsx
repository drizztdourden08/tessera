/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { getDockedResizeEdge } from '../behavior/get-docked-resize-edge';
import { FLOATING_EDGES } from './WidgetResizeHandles.constants';
import type { WidgetResizeHandlesProps } from './WidgetResizeHandles.type';

const WidgetResizeHandles = (props: WidgetResizeHandlesProps) => {
  const { mode, side, onEdgeMouseDown } = props;
  if (mode === 'floating') {
    return FLOATING_EDGES.map((edge) => (
      <Box key={edge} className={`widget__resize widget__resize--${edge}`} onMouseDown={onEdgeMouseDown(edge)} />
    ));
  }
  const edge = getDockedResizeEdge(side);
  return <Box className={`widget__resize widget__resize--${edge}`} onMouseDown={onEdgeMouseDown(edge)} />;
};

export { WidgetResizeHandles };
