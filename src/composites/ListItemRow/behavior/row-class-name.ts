/* @layer renderer-components @kind logic */
import type { RowClassParts } from './row-frame.type';

const rowClassName = (parts: RowClassParts): string => {
  const { selected, interactive, inList, inline, shown, media, nameAction, className } = parts;
  return [
    'list-item-row',
    interactive ? '' : 'row-inset',
    selected ? 'list-item-row--selected' : '',
    interactive ? 'list-item-row--interactive' : '',
    inList ? 'list-item-row--in-list' : '',
    inline ? 'list-item-row--action-inline' : '',
    inline && shown ? 'list-item-row--action-shown' : '',
    media ? 'list-item-row--media' : '',
    nameAction ? 'list-item-row--name-action' : '',
    className,
  ].filter(Boolean).join(' ');
};

export { rowClassName };
