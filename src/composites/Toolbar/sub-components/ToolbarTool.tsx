/* @layer renderer-components @kind component */
import { useContext, useRef } from 'react';
import { Tooltip } from '../../../primitives/Tooltip';
import { toolButtonProps } from '../behavior/tool-button-props';
import { ToolbarContext } from '../behavior/toolbar-context';
import { useToolMenu } from '../behavior/useToolMenu';
import { TIP_SIDE } from '../Toolbar.constants';
import { ToolbarToolButton } from './ToolbarToolButton';
import { ToolbarToolMenu } from './ToolbarToolMenu';
import type { ToolbarToolProps } from './ToolbarTool.type';

const ToolbarTool = (props: ToolbarToolProps) => {
  const { orientation, layout, measure } = useContext(ToolbarContext);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const options = props.options ?? [];
  const menu = !measure && options.length > 0;
  const tool = useToolMenu({ anchorRef, enabled: menu, hoverOpen: props.hoverOpen === true, disabled: props.disabled, orientation });
  const button = <ToolbarToolButton {...toolButtonProps(props, tool, menu)} anchorRef={anchorRef} />;

  return (
    <>
      {measure || layout === 'list' ? button : <Tooltip content={tool.open ? null : props.tip} placement={TIP_SIDE[orientation]}>{button}</Tooltip>}
      {tool.open && (
        <ToolbarToolMenu groups={options} anchorRef={anchorRef} tool={tool} label={props.label} hoverOpen={props.hoverOpen === true} popup={props.openOnPress === true} />
      )}
    </>
  );
};

export { ToolbarTool };
