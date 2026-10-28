/* @layer renderer-components @kind component */
import { useContext, useRef } from 'react';
import { Tooltip } from '../../../primitives/Tooltip';
import { toolButtonProps } from '../behavior/tool-button-props';
import { toolMenuParams } from '../behavior/tool-menu-params';
import { toolSetup } from '../behavior/tool-setup';
import { ToolbarContext } from '../behavior/toolbar-context';
import { useToolMenu } from '../behavior/useToolMenu';
import { TIP_SIDE } from '../Toolbar.constants';
import { ToolbarToolButton } from './ToolbarToolButton';
import { ToolbarToolPopups } from './ToolbarToolPopups';
import type { ToolbarToolProps } from './ToolbarTool.type';

const ToolbarTool = (given: ToolbarToolProps) => {
  const context = useContext(ToolbarContext);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const setup = toolSetup(given, context);
  const tool = useToolMenu(toolMenuParams(setup, anchorRef, context));
  const button = <ToolbarToolButton {...toolButtonProps(setup.props, tool, setup.menu)} anchorRef={anchorRef} />;
  const bare = context.measure || context.layout === 'list';

  return (
    <>
      {bare ? button : <Tooltip content={tool.open ? null : setup.props.tip} placement={TIP_SIDE[context.orientation]}>{button}</Tooltip>}
      <ToolbarToolPopups setup={setup} tool={tool} anchorRef={anchorRef} />
    </>
  );
};

export { ToolbarTool };
