/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { FilterClause } from '../../../data/filter/clause';

interface FilterClauseCardProps {
  field: FieldDescriptor;
  clause: FilterClause;
  onChangeOperator: (nextOp: string) => void;
  onChangeValue: (nextValue: unknown) => void;
  onToggleEnabled: (enabled: boolean) => void;
  onRemove: () => void;
  onChangeCaseSensitive?: (next: boolean) => void;
}

export type { FilterClauseCardProps };
