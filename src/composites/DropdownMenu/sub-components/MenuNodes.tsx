/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { isSeparator } from '../behavior/is-separator';
import { nodeRuns } from '../behavior/node-runs';
import { MenuEntry } from './MenuEntry';
import type { MenuNode } from '../DropdownMenu.type';
import type { MenuNodesProps } from './MenuNodes.type';

const drawNode = (node: MenuNode, key: string) => (isSeparator(node)
  ? <Box key={key} role="separator" className="dropdown__separator" />
  : <MenuEntry key={key} item={node} />);

const MenuNodes = (props: MenuNodesProps) => (
  <>
    {nodeRuns(props.nodes).map((run) => (run.radio
      ? <Box key={run.key} role="group" className="dropdown__group">{run.nodes.map((node, index) => drawNode(node, `${run.key}-${index}`))}</Box>
      : drawNode(run.nodes[0] as MenuNode, run.key)))}
  </>
);

export { MenuNodes };
