/* @layer renderer-components @kind util */
import type { ToolbarToolButtonProps } from '../sub-components/ToolbarToolButton.type';
import type { ToolbarToolProps } from '../sub-components/ToolbarTool.type';
import type { ToolMenu } from './useToolMenu.type';

const toolButtonProps = (props: ToolbarToolProps, tool: ToolMenu, menu: boolean): Omit<ToolbarToolButtonProps, 'anchorRef'> => {
  const { stopId, icon, label, caption, disabled, shortcut } = props;
  const popup = props.openOnPress === true;
  return {
    stopId,
    icon,
    label,
    caption,
    disabled,
    shortcut,
    active: props.active === true || (popup && tool.open),
    menu,
    open: tool.open,
    popup,
    hover: menu && props.hoverOpen === true ? tool.hover : {},
    onClick: popup ? tool.toggle : props.onPress,
    onKeyDown: tool.onKeyDown,
  };
};

export { toolButtonProps };
