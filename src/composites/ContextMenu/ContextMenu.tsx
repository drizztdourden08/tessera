/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useContextMenu } from './behavior/useContextMenu';
import { PointMenu } from './sub-components/PointMenu';
import type { ContextMenuProps } from './ContextMenu.type';
import './ContextMenu.css';

const ContextMenu = (props: ContextMenuProps) => {
  const { children, open, point, disabled = false, longPress = true, onOpen, onClose, ...menu } = props;
  const state = useContextMenu({ open, point, disabled, longPress, onOpen, onClose });

  return (
    <>
      {children !== undefined && <Box className="context-menu" {...state.target}>{children}</Box>}
      {state.point !== null && <PointMenu point={state.point} menu={menu} onClose={state.close} />}
    </>
  );
};

export { ContextMenu };
