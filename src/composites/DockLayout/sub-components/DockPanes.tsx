/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { rectStyle } from '../behavior/rect-style';
import type { DockPanesProps } from './DockPanes.type';

const DockPanes = (props: DockPanesProps) => {
  const { laid, renderPane } = props;
  return laid.leaves.map(({ node, rect }) => node.kind === 'pane' && (
    <Box
      key={node.key}
      className={`dock-layout__pane${node.makeRoom ? '' : ' dock-layout__pane--overlay'}`}
      data-pane-key={node.key}
      data-pane-id={node.key}
      style={rectStyle(rect)}
    >
      {renderPane(node, rect)}
    </Box>
  ));
};

export { DockPanes };
