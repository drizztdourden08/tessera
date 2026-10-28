/* @layer renderer-components @kind util */
import type { ToolbarContextEvent, ToolbarItem, ToolbarProps } from '../Toolbar.type';

const contextHandler = (item: ToolbarItem, toolbar: ToolbarProps['onContextMenu']): ((event: ToolbarContextEvent) => void) | undefined => {
  if (item.kind === 'separator') return undefined;
  const own = item.onContextMenu;
  if (own === undefined && toolbar === undefined) return undefined;
  return (event) => {
    event.preventDefault();
    own?.(event);
    toolbar?.(item.id, event);
  };
};

export { contextHandler };
