/* @layer renderer-components @kind util */
import type { ToolbarToolButtonProps } from '../sub-components/ToolbarToolButton.type';
import type { ToolbarToolProps } from '../sub-components/ToolbarTool.type';
import { keyWithContext } from './key-with-context';
import type { ToolMenu } from './useToolMenu.type';

const pressHandler = (props: ToolbarToolProps, tool: ToolMenu, menu: boolean): (() => void) | undefined => {
  if (props.openOnPress === true) return tool.toggle;
  if (!menu || props.clickOpen !== true) return props.onPress;
  return () => {
    props.onPress?.();
    tool.toggle();
  };
};

const clickHandler = (props: ToolbarToolProps, tool: ToolMenu, menu: boolean): (() => void) | undefined => {
  const run = pressHandler(props, tool, menu);
  if (run === undefined || props.holdOpen !== true) return run;
  return () => {
    if (!tool.hold.consumed()) run();
  };
};

const toolButtonProps = (props: ToolbarToolProps, tool: ToolMenu, menu: boolean): Omit<ToolbarToolButtonProps, 'anchorRef'> => {
  const { stopId, icon, label, caption, description, disabled, shortcut, badge, borrowed } = props;
  const popup = props.openOnPress === true;
  return {
    stopId,
    icon,
    label,
    caption,
    description,
    disabled,
    shortcut,
    badge,
    borrowed,
    active: props.active === true || (popup && tool.open),
    menu,
    open: tool.open,
    popup,
    panel: props.render !== undefined,
    hover: menu && props.hoverOpen === true ? tool.hover : {},
    hold: menu && props.holdOpen === true ? tool.hold.handlers : {},
    onClick: clickHandler(props, tool, menu),
    onContextMenu: props.onContext,
    onKeyDown: keyWithContext(tool.onKeyDown, props.onContext),
  };
};

export { toolButtonProps };
