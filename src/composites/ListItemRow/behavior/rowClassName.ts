/* @layer renderer-components @kind logic */
const rowClassName = (selected: boolean, interactive: boolean, className: string): string =>
  [
    'list-item-row',
    selected ? 'list-item-row--selected' : '',
    interactive ? 'list-item-row--interactive' : '',
    className,
  ].filter(Boolean).join(' ');

export { rowClassName };
