/* @layer renderer-components @kind component */
import { ScrollArea } from '../ScrollArea';
import { gridTemplate } from './grid-template';
import { ListboxGroup } from './ListboxGroup';
import { ListboxHeader } from './ListboxHeader';
import { ListboxStatus } from './ListboxStatus';
import type { GridStyle, ListboxListProps } from './listbox-view.type';

const ListboxList = <T,>(props: ListboxListProps<T>) => {
  const { view, loading, emptyText, labelledBy, label } = props;
  const { model, columns } = view;
  const style: GridStyle = { '--listbox-columns': gridTemplate(columns, true) };
  const withHeader = columns.some((column) => column.header !== undefined);

  return (
    <ScrollArea className="listbox-drop__scroll">
      <div
        role="listbox"
        id={model.listId}
        className="listbox"
        style={style}
        aria-multiselectable={view.multi || undefined}
        aria-labelledby={labelledBy}
        aria-label={labelledBy === undefined ? label : undefined}
        aria-busy={loading || undefined}
      >
        {withHeader && <ListboxHeader columns={columns} />}
        {model.rows.blocks.map((block, position) => (
          <ListboxGroup key={block.key} view={view} block={block} position={position} />
        ))}
      </div>
      <ListboxStatus loading={loading} empty={model.rows.entries.length === 0} emptyText={emptyText} />
    </ScrollArea>
  );
};

export { ListboxList };
