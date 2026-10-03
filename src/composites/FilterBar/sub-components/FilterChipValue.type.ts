/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { FilterClause } from '../../../data/filter/clause';

interface FilterChipValueProps {
  field: FieldDescriptor;
  clause: FilterClause;
  openOnMount: boolean;
  onChange: (nextValue: unknown) => void;
}

export type { FilterChipValueProps };
