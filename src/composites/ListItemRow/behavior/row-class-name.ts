/* @layer renderer-components @kind logic */
import type { RowClassParts } from './row-frame.type';

const rowClassName = (parts: RowClassParts): string => {
  const { selected, interactive, inList, inline, shown, media, nameAction, flat, className } = parts;
  const flags: readonly (readonly [boolean, string])[] = [
    [!interactive, 'row-inset'],
    [selected, 'list-item-row--selected'],
    [interactive, 'list-item-row--interactive'],
    [inList, 'list-item-row--in-list'],
    [inline, 'list-item-row--action-inline'],
    [inline && shown, 'list-item-row--action-shown'],
    [media, 'list-item-row--media'],
    [nameAction, 'list-item-row--name-action'],
    [flat, 'list-item-row--flat'],
  ];
  return ['list-item-row', ...flags.filter(([on]) => on).map(([, name]) => name), className].filter(Boolean).join(' ');
};

export { rowClassName };
