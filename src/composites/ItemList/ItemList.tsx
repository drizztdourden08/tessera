/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../primitives/Box';
import { SearchInput } from '../../primitives/SearchInput';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { showsFilter } from './behavior/shows-filter';
import { useItemListCreate } from './behavior/useItemListCreate';
import { useItemList } from './behavior/useItemList';
import { useRowsCap } from './behavior/useRowsCap';
import { useScrollActiveRow } from './behavior/useScrollActiveRow';
import type { ItemListProps } from './ItemList.type';
import { ItemListBody } from './sub-components/ItemListBody';
import { ItemListHead } from './sub-components/ItemListHead';
import './ItemList.css';

const ItemList = <T,>(props: ItemListProps<T>) => {
  const { title, create, createLabel, createTour = 'item-list-new', newDisabled, filterPlaceholder, loading, className } = props;
  const { lists } = useTesseraStrings();
  const view = useItemList(props);
  const form = useItemListCreate(props, view);
  const cap = useRowsCap(view.listRef, props.maxRows);
  useScrollActiveRow(view.listRef, props.selectedId, cap);
  const placeholder = filterPlaceholder ?? lists.filterOf(title);
  return (
    <Box as="section" className={['item-list', className].filter(Boolean).join(' ')} aria-label={title} aria-busy={loading === true ? true : undefined}>
      <ItemListHead
        title={title}
        shown={view.shownCount}
        total={view.total}
        onNew={form.onNew}
        newRef={form.newRef}
        creating={form.open}
        createLabel={createLabel}
        createTour={createTour}
        newDisabled={newDisabled}
      />
      {form.open && (
        <Box ref={form.slotRef} role="group" aria-label={createLabel ?? lists.newItem} className="item-list__create" onKeyDown={form.onKeyDown}>
          {create?.(form.close)}
        </Box>
      )}
      {showsFilter(props) && <SearchInput value={view.query} onChange={view.setQuery} placeholder={placeholder} aria-label={placeholder} />}
      <Box
        ref={view.listRef}
        className={cap === undefined ? 'item-list__body' : 'item-list__body item-list__body--capped'}
        style={cap === undefined ? undefined : ({ '--item-list-cap': `${cap}px` } as CSSProperties)}
        onKeyDown={view.onKeyDown}
        onFocus={view.onFocus}
        onMouseOver={view.onMouseOver}
        onMouseLeave={view.onMouseLeave}
      >
        <ItemListBody list={props} view={view} />
      </Box>
    </Box>
  );
};

export { ItemList };
