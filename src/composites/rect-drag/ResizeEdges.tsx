/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { RESIZE_EDGES } from './rect-drag.constants';
import type { ResizeEdgesProps } from './ResizeEdges.type';
import './ResizeEdges.css';

const ResizeEdges = ({ onPointerDown }: ResizeEdgesProps) => RESIZE_EDGES.map((edge) => (
  <Box
    key={edge}
    className={`rect-resize rect-resize--${edge}`}
    data-resize-edge={edge}
    aria-hidden="true"
    onPointerDown={(e) => onPointerDown(edge, e)}
  />
));

export { ResizeEdges };
