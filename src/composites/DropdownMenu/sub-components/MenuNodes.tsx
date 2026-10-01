/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { isSeparator } from '../behavior/is-separator';
import { MenuEntry } from './MenuEntry';
import type { MenuNodesProps } from './MenuNodes.type';

const MenuNodes = (props: MenuNodesProps) => (
  <>
    {props.nodes.map((node, index) => (isSeparator(node)
      ? <Box key={`separator-${index}`} role="separator" className="dropdown__separator" />
      : <MenuEntry key={node.id} item={node} />))}
  </>
);

export { MenuNodes };
