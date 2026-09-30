/* @layer renderer-components @kind component */
import { preventTextSelection } from '../dom/prevent-text-selection';
import { ListboxMark } from './ListboxMark';
import { ListboxOptionBody } from './ListboxOptionBody';
import type { ListboxOptionProps } from './listbox-view.type';

const ListboxOption = <T,>(props: ListboxOptionProps<T>) => {
  const { view, entry } = props;
  const { model } = view;
  const context = model.contextFor(entry);
  const state = { selected: context.selected, disabled: context.disabled, locked: model.states[entry.index]?.locked === true };

  return (
    <div
      id={model.optionId(entry.index)}
      role="option"
      className="listbox-option"
      data-index={entry.index}
      data-active={context.active || undefined}
      data-picked={(!view.multi && state.selected) || undefined}
      aria-selected={state.selected}
      aria-disabled={state.disabled || undefined}
      onMouseDown={preventTextSelection}
      onMouseMove={() => {
        if (!context.active && !state.disabled) model.active.activate(entry.index);
      }}
      onClick={() => {
        if (!state.disabled) view.onPick(entry);
      }}
    >
      <ListboxMark multi={view.multi} state={state} />
      <ListboxOptionBody view={view} context={context} />
    </div>
  );
};

export { ListboxOption };
