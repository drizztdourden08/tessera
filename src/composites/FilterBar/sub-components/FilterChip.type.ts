/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { FilterClause } from '../../../data/filter/clause';

interface FilterChipProps {
  field: FieldDescriptor;
  clause: FilterClause;
  openOnMount: boolean;
  onChangeOperator: (nextOp: string) => void;
  onChangeValue: (nextValue: unknown) => void;
  onToggleEnabled: (enabled: boolean) => void;
  onRemove: () => void;
  onChangeCaseSensitive?: (next: boolean) => void;
}

export type { FilterChipProps };
