/* @layer renderer-components @kind component */
import { gridTemplate } from './grid-template';
import { ListboxCells } from './ListboxCells';
import { neutralContext } from './neutral-context';
import type { GridStyle, ListboxValueRowProps } from './listbox-view.type';

const ListboxValueRow = <T,>(props: ListboxValueRowProps<T>) => {
  const { item, look } = props;
  const context = { ...neutralContext(item, look.categoryOf(item), 'trigger'), selected: true };
  const Item = look.valueComponent ?? look.itemComponent;
  if (Item) return <span className="listbox-value listbox-value--custom"><Item {...context} /></span>;
  if (look.renderItem) return <span className="listbox-value listbox-value--custom">{look.renderItem(context)}</span>;
  const shown = look.columns.filter((column) => column.inTrigger !== false);
  const style: GridStyle = { '--listbox-columns': gridTemplate(shown, false) };
  return (
    <span className="listbox-value listbox-value--row" style={style}>
      <ListboxCells columns={shown} context={context} highlight={false} />
    </span>
  );
};

export { ListboxValueRow };
