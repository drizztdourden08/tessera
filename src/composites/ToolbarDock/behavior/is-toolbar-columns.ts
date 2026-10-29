/* @layer renderer-components @kind logic */
import type { ToolbarColumns } from '../../Toolbar/Toolbar.type';

const isToolbarColumns = (raw: unknown): raw is ToolbarColumns => raw === 1 || raw === 2 || raw === 'auto';

export { isToolbarColumns };
