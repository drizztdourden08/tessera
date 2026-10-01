/* @layer renderer-components @kind hook */
import { useCallback, useId } from 'react';
import { listboxSetup } from '../../../primitives/listbox/listbox-setup';
import { useActiveScroll } from '../../../primitives/listbox/useActiveScroll';
import { useListbox } from '../../../primitives/listbox/useListbox';
import { useStartActive } from '../../../primitives/listbox/useStartActive';
import { useTypeaheadText } from '../../../primitives/listbox/useTypeaheadText';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { choiceColumns } from './choice-columns';
import { choiceLabel } from './choice-label';
import { choiceOptions } from './choice-options';
import { handleChoiceKey } from './handle-choice-key';
import { useFreshClick } from './useFreshClick';
import type { KeyboardEvent } from 'react';
import type { ChoiceSegmentState } from './choice-segment.type';
import type { SegmentParams } from './typed-segment.type';
import type { PatternChoice } from '../PatternInput.type';

const useChoiceSegment = (params: SegmentParams): ChoiceSegmentState => {
  const { field, slot, index } = params;
  const { fields } = useTesseraStrings();
  const idBase = useId();
  const typed = useTypeaheadText();
  const fresh = useFreshClick<HTMLButtonElement>();
  const value = field.value[slot.name];
  const options = choiceOptions(slot, field.setup.lists);
  const setup = listboxSetup<PatternChoice, 'value'>({
    items: options, valueField: 'value', value: typeof value === 'string' ? value : null,
    getKey: 'value', getLabel: choiceLabel, columns: choiceColumns(options),
  }, fields.noOptions);
  const model = useListbox({ setup, query: '', filter: false, idBase: `pattern${idBase}` });
  const open = field.focus.index === index && field.focus.open;
  useStartActive(open, model);
  useActiveScroll(field.popoverRef, model.active.index);

  const pick = (choice: string) => {
    field.setSlot(slot.name, choice);
    if (!field.moveTo(index + 1, 'all')) field.setOpen(false);
  };
  const attach = useCallback((node: HTMLButtonElement | null) => field.register(index)(node), [field.register, index]);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) =>
    handleChoiceKey({ field, slot, index, model, open, pick, typed }, event);
  const handleClick = () => field.setOpen(fresh.takeFresh() || !open);

  return {
    options, selected: options.find((option) => option.value === value), open, model, attach, handleKeyDown, handleClick,
    handleMouseDown: fresh.handleMouseDown,
    view: { model, columns: setup.columns, multi: false, highlight: false, onPick: (entry) => pick(entry.item.value) },
  };
};

export { useChoiceSegment };
