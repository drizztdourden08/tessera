/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SearchInput } from '../../primitives/SearchInput';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { showsFilter } from './behavior/shows-filter';
import { useManagedList } from './behavior/useManagedList';
import type { ManagedListProps } from './ManagedList.type';
import { ManagedListBody } from './sub-components/ManagedListBody';
import { ManagedListHead } from './sub-components/ManagedListHead';
import './ManagedList.css';

const ManagedList = <T,>(props: ManagedListProps<T>) => {
  const { title, items, onCreate, createLabel, filterPlaceholder, loading, className } = props;
  const { lists } = useTesseraStrings();
  const view = useManagedList(props);
  const placeholder = filterPlaceholder ?? lists.filterOf(title);
  return (
    <Box as="section" className={['managed-list', className].filter(Boolean).join(' ')} aria-label={title} aria-busy={loading === true ? true : undefined}>
      <ManagedListHead title={title} shown={view.shown.length} total={items.length} onCreate={onCreate} createLabel={createLabel} />
      {showsFilter(props) && <SearchInput value={view.query} onChange={view.setQuery} placeholder={placeholder} aria-label={placeholder} />}
      <Box ref={view.listRef} className="managed-list__body" onKeyDown={view.onKeyDown}>
        <ManagedListBody list={props} view={view} />
      </Box>
    </Box>
  );
};

export { ManagedList };
