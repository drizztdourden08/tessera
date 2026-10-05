/* @layer renderer-components @kind hook */
import { useMemo, useState } from 'react';
import { compile } from '../../../data/filter/clause';
import { matchesText } from '../../../data/text/matches-text';
import type { FilterClause } from '../../../data/filter/clause';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { logSchema } from './log-schema';
import { NO_FILTERS } from './useLogFilter.constants';
import type { LogFilter, LogFilterInput } from './useLogFilter.type';

const useLogFilter = (input: LogFilterInput): LogFilter => {
  const { rows, kinds } = input;
  const { panels } = useTesseraStrings();
  const [localSearch, setLocalSearch] = useState('');
  const [localFilters, setLocalFilters] = useState<readonly FilterClause[]>(NO_FILTERS);
  const search = input.search ?? localSearch;
  const filters = input.filters ?? localFilters;
  const schema = useMemo(
    () => logSchema(kinds, { kind: panels.logKind, tag: panels.logTag, message: panels.logMessage }),
    [kinds, panels.logKind, panels.logTag, panels.logMessage],
  );

  const shown = useMemo(() => {
    const labelOf = new Map(kinds?.map((kind) => [kind.id, kind.label]));
    const test = compile(filters, schema);
    return rows.filter((row) => matchesText(`${row.message} ${row.tag}`, search) && test({ ...row, kind: labelOf.get(row.kind) ?? row.kind }));
  }, [rows, kinds, filters, schema, search]);

  return {
    schema,
    shown,
    search,
    filters,
    setSearch: input.onSearchChange ?? setLocalSearch,
    setFilters: input.onFiltersChange ?? setLocalFilters,
  };
};

export { useLogFilter };
