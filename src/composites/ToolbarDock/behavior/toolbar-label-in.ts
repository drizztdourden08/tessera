/* @layer renderer-components @kind logic */
import type { ToolbarDefinition } from '../ToolbarDock.type';

const toolbarLabelIn = (definitions: readonly ToolbarDefinition[], id: string): string =>
  definitions.find((definition) => definition.id === id)?.label ?? id;

export { toolbarLabelIn };
