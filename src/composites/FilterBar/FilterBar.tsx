/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { TextInput } from '../../primitives/TextInput';
import { FacetPicker } from './sub-components/FacetPicker';
import { FilterClauseList } from './sub-components/FilterClauseList';
import type { FilterBarProps } from './FilterBar.type';
import '../../theme/filter-bar.css';

const FilterBar = (props: FilterBarProps) => {
  const {
    search, onSearchChange, searchPlaceholder = 'Search...', searchLabel = 'Search',
    schema, clauses, onChange, facets, className,
  } = props;

  return (
    <Box className={`filter-bar${className ? ` ${className}` : ''}`}>
      <TextInput
        type="text"
        className="filter-bar__search"
        placeholder={searchPlaceholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label={searchLabel}
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
