/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import type { WindowTitleBarStartProps } from './WindowTitleBarStart.type';

const WindowTitleBarStart = (props: WindowTitleBarStartProps) => {
  const { menu, menuLabel, onMenuOpenChange, pin, pinned, onControl, left } = props;
  const { windows, navigation } = useTesseraStrings();

  return (
    <Box className="window-title-bar__start">
      {menu && <DropdownMenu trigger={{ label: menuLabel ?? navigation.menu, iconOnly: true }} groups={menu} onOpenChange={onMenuOpenChange} />}
      {pin && (
        <IconButton size="sm" active={pinned} label={pinned ? windows.unpin : windows.pinOnTop} onClick={() => onControl('pin')}>
          <Icon name={pinned ? 'pin-off' : 'pin'} size={14} />
        </IconButton>
      )}
      {left}
    </Box>
  );
};

export { WindowTitleBarStart };
