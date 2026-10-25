/* @layer renderer-components @kind logic */
import { TOOLBAR_LAYOUT_V } from '../ToolbarDock.constants';
import type { ToolbarLayout } from '../ToolbarDock.type';

const emptyToolbarLayout = (): ToolbarLayout => ({
  v: TOOLBAR_LAYOUT_V,
  sides: { top: [], bottom: [], left: [], right: [] },
  corners: { 'top-left': [], 'top-right': [], 'bottom-left': [], 'bottom-right': [] },
  hidden: [],
  last: {},
});

export { emptyToolbarLayout };
