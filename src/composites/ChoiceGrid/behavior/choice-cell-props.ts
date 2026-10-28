/* @layer renderer-components @kind util */
import type { ChoiceCellProps } from '../ChoiceGrid.type';
import type { ChoiceCellPropsInput } from './choice-cell-props.type';

const choiceCellProps = (input: ChoiceCellPropsInput): ChoiceCellProps => {
  const { entry, role, selected, stop, pickOnRelease, pick, focus } = input;
  const state = role === 'listbox' ? { role: 'option' as const, 'aria-selected': selected } : { role: 'radio' as const, 'aria-checked': selected };
  return {
    ...state,
    'aria-label': entry.cell.label,
    tabIndex: stop ? 0 : -1,
    disabled: entry.cell.disabled === true,
    'data-choice-index': entry.index,
    onClick: (event) => {
      if (!pickOnRelease || event.detail === 0) pick(entry.index);
    },
    onFocus: () => focus(entry.index),
  };
};

export { choiceCellProps };
