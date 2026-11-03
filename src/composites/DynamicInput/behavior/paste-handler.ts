/* @layer renderer-components @kind logic */
import { choiceOptions } from './choice-options';
import { splitPasted } from './split-pasted';
import { writePasted } from './write-pasted';
import type { ClipboardEvent } from 'react';
import type { PatternField } from './pattern-field.type';
import type { PasteOwner } from './split-pasted.type';

const pasteHandler = <E extends HTMLElement>(field: PatternField, own: PasteOwner) => (event: ClipboardEvent<E>): void => {
  const lists = field.setup.lists;
  const values = splitPasted(field.parsed, event.clipboardData.getData('text'), (slot, taken) =>
    choiceOptions(slot, lists, { ...field.value, ...taken }));
  if (values === undefined) return;
  event.preventDefault();
  writePasted(field, values, own);
};

export { pasteHandler };
