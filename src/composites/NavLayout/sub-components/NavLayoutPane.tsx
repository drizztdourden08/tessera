/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ScrollArea } from '../../../primitives/ScrollArea';
import type { NavLayoutPaneProps } from './NavLayoutPane.type';

const NavLayoutPane = (props: NavLayoutPaneProps) => {
  const { scroll, children } = props;
  return scroll
    ? <ScrollArea className="nav-layout__pane">{children}</ScrollArea>
    : <Box className="nav-layout__pane">{children}</Box>;
};

export { NavLayoutPane };
