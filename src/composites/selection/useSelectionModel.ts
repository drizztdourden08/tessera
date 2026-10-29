/* @layer renderer-components @kind hook */
import { useMemo, useRef } from 'react';
import { allStateOf } from './all-state-of';
import { checkAllOf } from './check-all-of';
import { selectionKeyDown } from './selection-key-down';
import { selectionOps } from './selection-ops';
import { EMPTY } from './selection.constants';
import type { TypedText } from './selection-ops.type';
import type { SelectionModel, SelectionModelInput } from './selection.type';

const useSelectionModel = (input: SelectionModelInput): SelectionModel => {
  const { order, selected, onChange, onPick, seed = null, cellOf, isHole, labelOf, onFocusKey } = input;
  const anchor = useRef<string | null>(null);
  const typed = useRef<TypedText>({ text: '', at: 0 });
  const usable = useMemo(() => (isHole ? order.filter((key) => !isHole(key)) : order), [order, isHole]);

  return useMemo(() => {
    const ops = selectionOps({ usable, selected, onChange, onPick, seed, cellOf, isHole, anchor });
    return {
      ...ops,
      allState: allStateOf(usable, selected),
      isSelected: (key) => selected.has(key),
      checkAll: () => onChange(checkAllOf(usable, selected)),
      selectAll: () => onChange(new Set(usable)),
      clear: () => onChange(EMPTY),
      onKeyDown: selectionKeyDown({ ops, usable, selected, onChange, labelOf, onFocusKey, typed }),
    };
  }, [usable, selected, onChange, onPick, seed, cellOf, isHole, labelOf, onFocusKey]);
};

export { useSelectionModel };
