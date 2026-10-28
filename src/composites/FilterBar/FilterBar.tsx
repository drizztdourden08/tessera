/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SearchInput } from '../../primitives/SearchInput';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useTokenSearch } from './behavior/useTokenSearch';
import { FilterClauseList } from './sub-components/FilterClauseList';
import type { FilterBarProps } from './FilterBar.type';
import '../../theme/filter-bar.css';

const FilterBar = (props: FilterBarProps) => {
  const {
    search, onSearchChange, searchPlaceholder, searchLabel,
    schema, clauses, onChange, fields, maxChips, parseToken, extra, className,
  } = props;
  const { common } = useTesseraStrings();
  const tokens = useTokenSearch({ search, onSearchChange, schema, clauses, onChange, parseToken });

  return (
    <Box className={`filter-bar${className ? ` ${className}` : ''}`}>
      <SearchInput
        size="sm"
        className="filter-bar__search"
        placeholder={searchPlaceholder ?? common.searchPlaceholder}
        value={search}
        onChange={tokens.onSearchChange}
        onKeyDown={tokens.onKeyDown}
        aria-label={searchLabel ?? common.search}
      />
      {schema !== undefined && clauses !== undefined && onChange !== undefined && (
        <FilterClauseList schema={schema} clauses={clauses} fields={fields} maxChips={maxChips} onChange={onChange} />
      )}
      {extra !== undefined && <Box className="filter-bar__extra">{extra}</Box>}
    </Box>
  );
};

export { FilterBar };
