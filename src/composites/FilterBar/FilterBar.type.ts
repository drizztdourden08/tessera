/* @layer renderer-components @kind types */
import type { SchemaLike } from '../../data/schema/build-schema';
import type { FilterClause } from '../../data/filter/clause';

interface FilterFacetOption {
  id: string;
  label: string;
}

interface FilterFacet {
  id: string;
  label: string;
  options: readonly FilterFacetOption[];
  hidden: ReadonlySet<string>;
  onToggle: (optionId: string) => void;
}

interface FilterBarProps {
  search: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  searchLabel?: string;
  schema?: SchemaLike;
  clauses?: readonly FilterClause[];
  onChange?: (next: readonly FilterClause[]) => void;
  facets?: readonly FilterFacet[];
  className?: string;
}

export type { FilterBarProps, FilterFacet, FilterFacetOption };
