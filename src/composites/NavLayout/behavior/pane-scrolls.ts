/* @layer renderer-components @kind logic */
import type { NavLayoutPaneScroll } from '../NavLayout.type';

const paneScrolls = (mode: NavLayoutPaneScroll, showResults: boolean): boolean =>
  mode === 'always' || (mode === 'page' && !showResults);

export { paneScrolls };
