/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { actionItem } from '../behavior/action-item';
import { barItemProps } from '../behavior/bar-item-props';
import { PIN_ITEM } from '../WindowTitleBar.constants';
import { TitleBarAction } from './TitleBarAction';
import { TitleBarTip } from './TitleBarTip';
import type { WindowTitleBarStartProps } from './WindowTitleBarStart.type';

const WindowTitleBarStart = (props: WindowTitleBarStartProps) => {
  const { menu, menuLabel, onMenuOpenChange, pin, pinned, onControl, actions, hidden } = props;
  const { windows, navigation } = useTesseraStrings();
  const pinLabel = pinned ? windows.unpin : windows.pinOnTop;

  return (
    <Box className="window-title-bar__start">
      {menu.length > 0 && <DropdownMenu trigger={{ label: menuLabel ?? navigation.menu, iconOnly: true }} groups={menu} onOpenChange={onMenuOpenChange} />}
      {pin && (
        <TitleBarTip label={pinLabel} away={hidden.has(PIN_ITEM)}>
          <IconButton {...barItemProps(PIN_ITEM, hidden.has(PIN_ITEM))} size="sm" active={pinned} label={pinLabel} onClick={() => onControl('pin')}>
            <Icon name={pinned ? 'pin-off' : 'pin'} size={14} />
          </IconButton>
        </TitleBarTip>
      )}
      {actions.map((action) => <TitleBarAction key={action.id} action={action} away={hidden.has(actionItem(action.id))} />)}
    </Box>
  );
};

export { WindowTitleBarStart };
