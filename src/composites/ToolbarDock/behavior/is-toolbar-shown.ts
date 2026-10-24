/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import { toolbarSideOf } from './toolbar-side-of';

const isToolbarShown = (layout: ToolbarLayout, id: string): boolean => toolbarSideOf(layout, id) !== null;

export { isToolbarShown };
