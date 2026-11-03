/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { ScrollArea } from '../ScrollArea';
import { FIRST_RANGE, WINDOW_THRESHOLD } from './listbox.constants';
import { listStyle } from './list-style';
import { ListboxGroup } from './ListboxGroup';
import { ListboxHeader } from './ListboxHeader';
import { ListboxSizer } from './ListboxSizer';
import { ListboxStatus } from './ListboxStatus';
import { useListboxWindow } from './useListboxWindow';
import type { ListboxListProps } from './listbox-view.type';

const ListboxList = <T,>(props: ListboxListProps<T>) => {
  const { view, loading, emptyText, labelledBy, label } = props;
  const { model, columns } = view;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const windowed = model.rows.entries.length > WINDOW_THRESHOLD;
  const slices = useListboxWindow({
    enabled: windowed, scrollerRef, listRef, blocks: model.rows.blocks, activeIndex: model.active.index, query: model.query,
  });
  const withHeader = columns.some((column) => column.header !== undefined);

  return (
    <ScrollArea ref={scrollerRef} scrollbar="slim" className="listbox-drop__scroll">
      <div
        ref={listRef}
        role="listbox"
        id={model.listId}
        className="listbox"
        style={listStyle(columns, windowed ? slices.rowSize : undefined)}
        data-windowed={windowed || undefined}
        aria-multiselectable={view.multi || undefined}
        aria-labelledby={labelledBy}
        aria-label={labelledBy === undefined ? label : undefined}
        aria-busy={loading || undefined}
      >
        {withHeader && <ListboxHeader columns={columns} />}
        {model.rows.blocks.map((block, position) => (
          <ListboxGroup
            key={block.key}
            view={view}
            block={block}
            position={position}
            range={windowed ? slices.ranges[position] ?? FIRST_RANGE : undefined}
          />
        ))}
        {windowed && <ListboxSizer view={view} />}
      </div>
      <ListboxStatus loading={loading} empty={model.rows.entries.length === 0} emptyText={emptyText} />
    </ScrollArea>
  );
};

export { ListboxList };
