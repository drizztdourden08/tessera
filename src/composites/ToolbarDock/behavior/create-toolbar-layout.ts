/* @layer renderer-components @kind logic */
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { emptyToolbarLayout } from './empty-toolbar-layout';
import { placeOrHideToolbar } from './place-or-hide-toolbar';

const createToolbarLayout = (defs: readonly ToolbarDefinition[]): ToolbarLayout => defs.reduce(placeOrHideToolbar, emptyToolbarLayout());

export { createToolbarLayout };
