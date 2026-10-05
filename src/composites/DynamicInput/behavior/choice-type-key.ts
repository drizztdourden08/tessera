/* @layer renderer-components @kind util */
import { foldText } from '../../../data/text/fold-text';
import { typeaheadIndex } from '../../../primitives/listbox/typeahead-index';
import type { KeyboardEvent } from 'react';
import type { ChoiceKeyContext } from './choice-segment.type';

const isUnique = (labels: readonly string[], text: string): boolean => {
  const needle = foldText(text);
  return labels.filter((label) => foldText(label).startsWith(needle)).length === 1;
};

const choiceTypeKey = (context: ChoiceKeyContext, event: KeyboardEvent): boolean => {
  const { model, field, slot, index, typed } = context;
  if (event.ctrlKey || event.metaKey || event.altKey) return false;
  const text = typed(event.key, event.timeStamp);
  if (text === null) return false;
  const found = typeaheadIndex(model.labels, model.active.enabled, model.active.index, text);
  const entry = model.rows.entries[found];
  if (entry === undefined) return false;
  event.preventDefault();
  model.active.activate(found);
  field.setSlot(slot.name, entry.item.value);
  const done = isUnique(model.labels, text);
  if (done && field.moveTo(index + 1, 'all')) return true;
  field.setOpen(!done);
  return true;
};

export { choiceTypeKey };
