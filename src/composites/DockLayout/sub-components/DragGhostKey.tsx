/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Shortcut } from '../../../primitives/Shortcut';
import { Span } from '../../../primitives/text-elements';
import type { DragGhostKeyProps } from './DragGhostKey.type';

const DragGhostKey = (props: DragGhostKeyProps) => {
  const { keys, gesture, does, lit } = props;
  return (
    <Box className={`dock-ghost__key${lit ? ' dock-ghost__key--lit' : ''}`}>
      {keys && <Shortcut keys={keys} state={lit ? 'lit' : 'idle'} className="dock-ghost__kbd" />}
      {gesture && <Span className="dock-ghost__gesture">{gesture}</Span>}
      <Span className="dock-ghost__does">{does}</Span>
    </Box>
  );
};

export { DragGhostKey };
