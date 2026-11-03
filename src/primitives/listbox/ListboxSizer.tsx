/* @layer renderer-components @kind component */
import { longestEntry } from './longest-entry';
import { ListboxMark } from './ListboxMark';
import { ListboxOptionBody } from './ListboxOptionBody';
import type { ListboxSizerProps } from './listbox-window.type';

const ListboxSizer = <T,>(props: ListboxSizerProps<T>) => {
  const { view } = props;
  const entry = longestEntry(view.model.rows.entries);
  if (entry === undefined) return null;
  const context = view.model.contextFor(entry);
  const state = { selected: context.selected, disabled: context.disabled, locked: false };

  return (
    <div className="listbox-option listbox-sizer row-inset" aria-hidden inert>
      <ListboxMark multi={view.multi} state={state} />
      <ListboxOptionBody view={view} context={context} />
    </div>
  );
};

export { ListboxSizer };
