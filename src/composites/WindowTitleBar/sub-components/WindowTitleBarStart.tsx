/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import type { WindowTitleBarStartProps } from './WindowTitleBarStart.type';

const WindowTitleBarStart = (props: WindowTitleBarStartProps) => {
  const { menu, menuAnchorRef, pinned, onPinToggle, left } = props;

  return (
    <Box ref={menuAnchorRef} className="window-title-bar__start">
      {menu}
      {onPinToggle && (
        <IconButton size="sm" active={pinned} label={pinned ? 'Unpin window' : 'Pin window on top'} onClick={onPinToggle}>
          <Icon name={pinned ? 'pin-off' : 'pin'} size={14} />
        </IconButton>
      )}
      {left}
    </Box>
  );
};

export { WindowTitleBarStart };
