/* @layer renderer-components @kind component */
import { useCallback, useMemo } from 'react';
import { toSchemaIndex } from '../../../data/schema/build-schema';
import { addClause } from '../behavior/clause-list';
import { removeClause } from '../behavior/removeClause';
import { updateClauseById } from '../behavior/updateClauseById';
import { valueForOperatorChange } from '../behavior/valueForOperatorChange';
import { AddFilterButton } from './AddFilterButton';
import { FilterClauseCard } from './FilterClauseCard';
import type { FilterClause } from '../../../data/filter/clause';
import type { FilterClauseListProps } from './FilterClauseList.type';

const FilterClauseList = (props: FilterClauseListProps) => {
  const { schema, clauses, onChange } = props;
  const index = useMemo(() => toSchemaIndex(schema), [schema]);
  const filteredPaths = useMemo(() => clauses.map((clause) => clause.path), [clauses]);

  const updateClause = useCallback((id: string, patch: Partial<FilterClause>) => {
    onChange(updateClauseById(clauses, id, patch));
  }, [clauses, onChange]);

  const handleOperatorChange = useCallback((clause: FilterClause, nextOp: string) => {
    const field = index.byPath(clause.path);
    const nextValue = field
      ? valueForOperatorChange({ kind: field.kind, previousOp: clause.op, nextOp, currentValue: clause.value })
      : clause.value;
    updateClause(clause.id, { op: nextOp, value: nextValue });
  }, [index, updateClause]);

  const handleRemove = useCallback((id: string) => {
    onChange(removeClause(clauses, id));
  }, [clauses, onChange]);

  const handleAdd = useCallback((clause: FilterClause) => {
    onChange(addClause(clauses, clause));
  }, [clauses, onChange]);

  return (
    <>
      {clauses.map((clause) => {
        const field = index.byPath(clause.path);
        if (!field) return null;
        return (
          <FilterClauseCard
            key={clause.id}
            field={field}
            clause={clause}
            onChangeOperator={(nextOp) => handleOperatorChange(clause, nextOp)}
            onChangeValue={(value) => updateClause(clause.id, { value })}
            onChangeCaseSensitive={(caseSensitive) => updateClause(clause.id, { caseSensitive })}
            onToggleEnabled={(enabled) => updateClause(clause.id, { enabled })}
            onRemove={() => handleRemove(clause.id)}
          />
        );
      })}
      <AddFilterButton schema={index} excludePaths={filteredPaths} onAdd={handleAdd} />
    </>
  );
};

export { FilterClauseList };
