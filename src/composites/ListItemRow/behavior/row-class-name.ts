/* @layer renderer-components @kind logic */
import type { RowClassParts } from './row-frame.type';

const rowClassName = (parts: RowClassParts): string => {
  const { selected, interactive, inList, inline, shown, className } = parts;
  return [
    'list-item-row',
    selected ? 'list-item-row--selected' : '',
    interactive ? 'list-item-row--interactive' : '',
    inList ? 'list-item-row--in-list' : '',
    inline ? 'list-item-row--action-inline' : '',
    inline && shown ? 'list-item-row--action-shown' : '',
    className,
  ].filter(Boolean).join(' ');
};

export { rowClassName };
