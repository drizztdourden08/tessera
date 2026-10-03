/* @layer renderer-components @kind logic */
const rowClassName = (selected: boolean, interactive: boolean, inList: boolean, className: string): string =>
  [
    'list-item-row',
    selected ? 'list-item-row--selected' : '',
    interactive ? 'list-item-row--interactive' : '',
    inList ? 'list-item-row--in-list' : '',
    className,
  ].filter(Boolean).join(' ');

export { rowClassName };
