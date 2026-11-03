/* @layer renderer-components @kind hook */
import { useId } from 'react';
import { queryFilter } from '../../../primitives/Combobox/behavior/query-filter';
import { listboxSetup } from '../../../primitives/listbox/listbox-setup';
import { useActiveScroll } from '../../../primitives/listbox/useActiveScroll';
import { useListbox } from '../../../primitives/listbox/useListbox';
import { useStartActive } from '../../../primitives/listbox/useStartActive';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { choiceColumns } from './choice-columns';
import { choiceLabel } from './choice-label';
import type { ChoiceModel, ChoiceSearch } from './choice-segment.type';
import type { SegmentParams } from './typed-segment.type';
import type { PatternChoice } from '../DynamicInput.type';

const useChoiceModel = (params: SegmentParams, options: readonly PatternChoice[], search: ChoiceSearch): ChoiceModel => {
  const { field, slot, index } = params;
  const { fields } = useTesseraStrings();
  const idBase = useId();
  const value = field.value[slot.name];
  const searching = slot.search === true;
  const setup = listboxSetup<PatternChoice, 'value'>({
    items: options, valueField: 'value', value: typeof value === 'string' ? value : null,
    getKey: 'value', getLabel: choiceLabel, columns: choiceColumns(options),
  }, fields.noOptions);
  const filter = queryFilter<PatternChoice>(undefined, !searching);
  const model = useListbox({ setup, query: search.query, filter, idBase: `pattern${idBase}` });
  const open = field.focus.index === index && field.focus.open;
  useStartActive(open, model, search.pickFirst);
  useActiveScroll(field.popoverRef, model.active.index);

  return {
    model, open,
    view: { model, columns: setup.columns, multi: false, highlight: searching, onPick: (entry) => search.pick(entry.item.value) },
  };
};

export { useChoiceModel };
