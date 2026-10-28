/* @layer renderer-components @kind util */
const rowClasses = (branch: boolean, selected: boolean, dragging: boolean): string => [
  'tree__row row-inset focus-ring-inset',
  branch && 'tree__row--branch',
  selected && 'tree__row--selected',
  dragging && 'tree__row--dragging',
].filter(Boolean).join(' ');

export { rowClasses };
