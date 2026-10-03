/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SearchInput } from '../../primitives/SearchInput';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { FacetPicker } from './sub-components/FacetPicker';
import { FilterClauseList } from './sub-components/FilterClauseList';
import type { FilterBarProps } from './FilterBar.type';
import '../../theme/filter-bar.css';

const FilterBar = (props: FilterBarProps) => {
  const {
    search, onSearchChange, searchPlaceholder, searchLabel,
    schema, clauses, onChange, facets, className,
  } = props;
  const { common } = useTesseraStrings();

  return (
    <Box className={`filter-bar${className ? ` ${className}` : ''}`}>
      <SearchInput
        size="sm"
        className="filter-bar__search"
        placeholder={searchPlaceholder ?? common.searchPlaceholder}
        value={search}
        onChange={onSearchChange}
        aria-label={searchLabel ?? common.search}
      />
      {schema !== undefined && clauses !== undefined && onChange !== undefined && (
        <FilterClauseList schema={schema} clauses={clauses} onChange={onChange} />
      )}
      {facets?.map((facet) => (
        <FacetPicker key={facet.id} facet={facet} />
      ))}
    </Box>
  );
};

export { FilterBar };
