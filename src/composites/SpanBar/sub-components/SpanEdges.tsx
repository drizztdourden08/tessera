/* @layer renderer-components @kind component */
import { ResizeEdges } from '../../rect-drag/ResizeEdges';
import { SPAN_EDGES } from '../SpanBar.constants';
import type { SpanEdgesProps } from './SpanEdges.type';

const SpanEdges = ({ readOnly, press }: SpanEdgesProps) => {
  if (readOnly) return null;
  return <ResizeEdges edges={SPAN_EDGES} onPointerDown={(edge, event) => press(edge === 'w' ? 'start' : 'end')(event)} />;
};

export { SpanEdges };
