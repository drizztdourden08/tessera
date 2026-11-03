/* @layer renderer-components @kind component */
import { Divider } from '../Divider';
import { Span } from '../text-elements';
import { ListboxEntries } from './ListboxEntries';
import type { ListboxGroupProps } from './listbox-view.type';

const ListboxGroup = <T,>(props: ListboxGroupProps<T>) => {
  const { view, block, position, range } = props;
  const options = <ListboxEntries view={view} block={block} range={range} />;
  if (block.category === undefined) return options;
  const headerId = `${view.model.listId}-group-${position}`;

  return (
    <div role="group" aria-labelledby={headerId} className="listbox-group">
      {position > 0 && <span className="listbox-group__rule" aria-hidden><Divider /></span>}
      <div id={headerId} role="presentation" className="listbox-group__header row-inset">
        {block.icon != null && <Span className="listbox-group__icon" aria-hidden>{block.icon}</Span>}
        <Span className="listbox-group__label">{block.label}</Span>
      </div>
      {options}
    </div>
  );
};

export { ListboxGroup };
