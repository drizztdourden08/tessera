/* @layer renderer-components @kind component */
import { ListboxCells } from './ListboxCells';
import type { ListboxOptionBodyProps } from './listbox-view.type';

const ListboxOptionBody = <T,>(props: ListboxOptionBodyProps<T>) => {
  const { view, context } = props;
  const { itemComponent: Item, renderItem } = view;
  if (Item) return <span className="listbox-option__custom"><Item {...context} /></span>;
  if (renderItem) return <span className="listbox-option__custom">{renderItem(context)}</span>;
  return <ListboxCells columns={view.columns} context={context} highlight={view.highlight} />;
};

export { ListboxOptionBody };
