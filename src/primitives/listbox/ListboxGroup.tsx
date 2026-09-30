/* @layer renderer-components @kind component */
import { ListboxOption } from './ListboxOption';
import type { ListboxGroupProps } from './listbox-view.type';

const ListboxGroup = <T,>(props: ListboxGroupProps<T>) => {
  const { view, block, position } = props;
  const options = block.entries.map((entry) => <ListboxOption key={entry.key} view={view} entry={entry} />);
  if (block.category === undefined) return <>{options}</>;
  const headerId = `${view.model.listId}-group-${position}`;

  return (
    <div role="group" aria-labelledby={headerId} className="listbox-group">
      <div id={headerId} role="presentation" className="listbox-group__header">
        {block.icon != null && <span className="listbox-group__icon" aria-hidden>{block.icon}</span>}
        <span className="listbox-group__label">{block.label}</span>
      </div>
      {options}
    </div>
  );
};

export { ListboxGroup };
