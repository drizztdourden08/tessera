/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SchemaLike } from '../../data/schema/build-schema';
import type { FilterClause } from '../../data/filter/clause';
import type { FilterTokenParser } from './behavior/take-tokens.type';

interface FilterBarProps {
  search: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  searchLabel?: string;
  schema?: SchemaLike;
  clauses?: readonly FilterClause[];
  onChange?: (next: readonly FilterClause[]) => void;
  fields?: readonly string[];
  maxChips?: number;
  parseToken?: boolean | FilterTokenParser;
  extra?: ReactNode;
  className?: string;
}

export type { FilterBarProps, FilterTokenParser };
