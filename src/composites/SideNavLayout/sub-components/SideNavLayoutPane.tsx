/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ScrollArea } from '../../../primitives/ScrollArea';
import type { SideNavLayoutPaneProps } from './SideNavLayoutPane.type';

const SideNavLayoutPane = (props: SideNavLayoutPaneProps) => {
  const { scroll, children } = props;
  return scroll
    ? <ScrollArea className="side-nav-layout__pane">{children}</ScrollArea>
    : <Box className="side-nav-layout__pane">{children}</Box>;
};

export { SideNavLayoutPane };
