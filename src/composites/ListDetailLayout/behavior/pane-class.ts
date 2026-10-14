/* @layer renderer-components @kind logic */
const paneClass = (pane: 'list' | 'detail', scroll: boolean, empty = false): string => [
  `list-detail-layout__${pane}`,
  !scroll && `list-detail-layout__${pane}--clip`,
  empty && `list-detail-layout__${pane}--empty`,
].filter(Boolean).join(' ');

export { paneClass };
