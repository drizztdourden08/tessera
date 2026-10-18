/* @layer renderer-components @kind logic */
import type { PaneLook } from './pane-look.type';

const paneClass = (pane: 'list' | 'detail', look: PaneLook): string => [
  `list-detail-layout__${pane}`,
  !look.scroll && `list-detail-layout__${pane}--clip`,
  look.empty && `list-detail-layout__${pane}--empty`,
  look.folded && `list-detail-layout__${pane}--folded`,
].filter(Boolean).join(' ');

export { paneClass };
