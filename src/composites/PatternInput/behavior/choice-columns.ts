/* @layer renderer-components @kind util */
import { createElement } from 'react';
import { EmojiIcon } from '../../../primitives/EmojiIcon';
import { choiceLabel } from './choice-label';
import { flagGlyph } from './flag-glyph';
import type { ListboxColumn } from '../../../primitives/listbox/listbox.type';
import type { PatternChoice } from '../PatternInput.type';

const flagColumn: ListboxColumn<PatternChoice> = {
  id: 'flag',
  width: 'auto',
  render: (_value, context) => createElement(EmojiIcon, { glyph: flagGlyph(context.item.flag), size: 'sm' }),
};

const labelColumn: ListboxColumn<PatternChoice> = { id: 'label', field: choiceLabel, width: 'fill' };

const detailColumn: ListboxColumn<PatternChoice> = { id: 'detail', field: 'detail', tone: 'muted', align: 'end' };

const choiceColumns = (options: readonly PatternChoice[]): ListboxColumn<PatternChoice>[] => [
  ...(options.some((option) => flagGlyph(option.flag) !== '') ? [flagColumn] : []),
  labelColumn,
  ...(options.some((option) => option.detail !== undefined) ? [detailColumn] : []),
];

export { choiceColumns };
