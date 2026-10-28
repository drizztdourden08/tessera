/* @layer renderer-components @kind util */
import type { ToolbarToolProps } from '../sub-components/ToolbarTool.type';
import type { ToolbarContextValue } from './toolbar-context.type';
import type { ToolSetup } from './tool-setup.type';

const toolSetup = (given: ToolbarToolProps, context: ToolbarContextValue): ToolSetup => {
  const panel = given.render !== undefined;
  const props = panel ? { ...given, openOnPress: true } : given;
  const options = props.options ?? [];
  const inline = !context.measure && context.layout === 'list' && context.inlineOptions && props.active === true && options.length > 0;
  const menu = !context.measure && !inline && (options.length > 0 || panel);
  return { props, panel, options, inline, menu };
};

export { toolSetup };
