/* @layer renderer-components @kind logic */
import type { SideNavLayoutPaneScroll } from '../SideNavLayout.type';

const paneScrolls = (mode: SideNavLayoutPaneScroll, showResults: boolean): boolean =>
  mode === 'always' || (mode === 'page' && !showResults);

export { paneScrolls };
