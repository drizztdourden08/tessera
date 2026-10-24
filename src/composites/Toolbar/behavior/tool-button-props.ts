/* @layer renderer-components @kind util */
import type { ToolbarToolButtonProps } from '../sub-components/ToolbarToolButton.type';
import type { ToolbarToolProps } from '../sub-components/ToolbarTool.type';
import type { ToolMenu } from './useToolMenu.type';

const clickHandler = (props: ToolbarToolProps, tool: ToolMenu, menu: boolean): (() => void) | undefined => {
  if (props.openOnPress === true) return tool.toggle;
  if (!menu || props.clickOpen !== true) return props.onPress;
  return () => {
    props.onPress?.();
    tool.toggle();
  };
};

const toolButtonProps = (props: ToolbarToolProps, tool: ToolMenu, menu: boolean): Omit<ToolbarToolButtonProps, 'anchorRef'> => {
  const { stopId, icon, label, caption, description, disabled, shortcut } = props;
  const popup = props.openOnPress === true;
  return {
    stopId,
    icon,
    label,
    caption,
    description,
    disabled,
    shortcut,
    active: props.active === true || (popup && tool.open),
    menu,
    open: tool.open,
    popup,
    hover: menu && props.hoverOpen === true ? tool.hover : {},
    onClick: clickHandler(props, tool, menu),
    onKeyDown: tool.onKeyDown,
  };
};

export { toolButtonProps };
