/* @layer renderer-components @kind component */
import { preventTextSelection } from '../dom/prevent-text-selection';
import { ReasonTip } from '../field-control/ReasonTip';
import { itemReason } from './item-reason';
import { ListboxMark } from './ListboxMark';
import { ListboxOptionBody } from './ListboxOptionBody';
import type { ListboxOptionProps } from './listbox-view.type';

const ListboxOption = <T,>(props: ListboxOptionProps<T>) => {
  const { view, entry } = props;
  const { model } = view;
  const context = model.contextFor(entry);
  const state = { selected: context.selected, disabled: context.disabled, locked: model.states[entry.index]?.locked === true };
  const reason = state.disabled ? itemReason(entry.item) : undefined;

  return (
    <ReasonTip reason={reason}>
      <div
        id={model.optionId(entry.index)}
        role="option"
        className="listbox-option row-inset"
        data-index={entry.index}
        data-active={context.active || undefined}
        data-picked={(!view.multi && state.selected) || undefined}
        aria-selected={state.selected}
        aria-disabled={state.disabled || undefined}
        aria-description={reason}
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
    </ReasonTip>
  );
};

export { ListboxOption };
