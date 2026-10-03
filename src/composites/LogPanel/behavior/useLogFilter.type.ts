/* @layer renderer-components @kind types */
import type { FilterClause } from '../../../data/filter/clause';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { LogPanelProps, LogRow } from '../LogPanel.type';

type LogFilterInput = Pick<LogPanelProps, 'rows' | 'kinds' | 'search' | 'onSearchChange' | 'filters' | 'onFiltersChange'>;

interface LogFilter {
  schema: readonly FieldDescriptor[];
  shown: readonly LogRow[];
  search: string;
  filters: readonly FilterClause[];
  setSearch: (query: string) => void;
  setFilters: (next: readonly FilterClause[]) => void;
}

export type { LogFilter, LogFilterInput };
