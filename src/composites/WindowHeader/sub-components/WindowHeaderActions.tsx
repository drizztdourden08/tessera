/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { WindowHeaderActionsProps } from '../WindowHeader.type';

const WindowHeaderActions = ({ children }: WindowHeaderActionsProps) => (
  <Box className="window-header__actions">{children}</Box>
);

export { WindowHeaderActions };
